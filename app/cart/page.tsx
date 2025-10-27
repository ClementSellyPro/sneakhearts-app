import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import CartContent from "./_components/CartContent";
import EmptyCart from "./_components/EmptyCart";
import OrderHistory from "./_components/OrderHistory";

const prisma = new PrismaClient();

export default async function Cart() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <EmptyCart />;
  }

  const cartItems = await prisma.cartItem.findMany({
    where: { userId: session.user.id },
    include: {
      variation: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  const formattedItems = cartItems.map((item) => ({
    addedAt: item.createdAt,
    currentPrice: item.variation.salePrice ?? item.variation.price,
    id: item.id,
    priceAtTime: item.price,
    priceChanged:
      item.price !== (item.variation.salePrice || item.variation.price),
    product: {
      brand: item.variation.product.brand,
      colorway: item.variation.colorway,
      id: item.variation.product.id,
      image: item.variation.thumbnailUrl,
      name: item.variation.product.name,
      variationId: item.variation.product.productId,
    },
    quantity: item.quantity,
    size: item.size,
    subtotal: item.price * item.quantity,
  }));

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const cartData = {
    cartItems: formattedItems,
    total,
    itemCount,
  };

  return (
    <div className="min-h-screen px-6 md:px-24 lg:px-48 py-12 md:py-18 w-full">
      <CartContent cartListData={cartData} />
      <OrderHistory />
    </div>
  );
}
