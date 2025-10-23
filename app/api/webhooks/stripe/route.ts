import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "No signature" }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const userId = session.metadata?.userId;
    const totalAmount = parseFloat(session.metadata?.totalAmount || "0");

    if (!userId) {
      console.error("Missing metadata in session");
      return NextResponse.json({ error: "Missing metadata" }, { status: 400 });
    }

    try {
      const existingOrder = await prisma.order.findUnique({
        where: { stripeSessionId: session.id },
      });

      if (existingOrder) {
        console.log(`Order already exists for session ${session.id}`);
        return NextResponse.json({ received: true });
      }

      const cartItems = await prisma.cartItem.findMany({
        where: { userId },
        include: {
          variation: {
            include: {
              product: true,
            },
          },
        },
      });

      if (cartItems.length === 0) {
        console.error("No cart items found for user");
        return NextResponse.json({ error: "No cart items" }, { status: 400 });
      }

      const orderItems = cartItems.map((item) => ({
        variationId: item.variationId,
        size: item.size,
        quantity: item.quantity,
        price: item.price,
        productName: item.variation.product.name,
        colorway: item.variation.colorway,
        imageUrl: item.variation.thumbnailUrl,
      }));

      await prisma.$transaction(async (tx) => {
        const order = await tx.order.create({
          data: {
            userId,
            stripeSessionId: session.id,
            status: "paid",
            totalAmount,
            orderItems: {
              create: orderItems,
            },
          },
        });

        await tx.cartItem.deleteMany({
          where: { userId },
        });

        console.log(`Order ${order.id} completed successfully`);
      });
    } catch (error) {
      console.error("Error processing order:", error);
      return NextResponse.json(
        { error: "Failed to process order" },
        { status: 500 }
      );
    }
  }

  // Handle payment failures
  if (
    event.type === "checkout.session.expired" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;

    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "cancelled" },
      });
    }
  }

  return NextResponse.json({ received: true });
}
