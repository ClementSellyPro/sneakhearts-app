import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function OrderHistory() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) return null;

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
      status: "paid",
    },
    include: {
      orderItems: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 5,
  });

  return (
    <div className="pt-20">
      <p className="text-2xl font-semibold pb-4">Historique des commandes</p>
      <div className="flex flex-col md:flex-row gap-4 overflow-auto">
        {orders.length > 0 &&
          orders.map((order) => (
            <div
              key={order.id}
              className="flex flex-col gap-4 border w-full md:w-fit min-h-60 p-4 rounded-xl"
            >
              <div className="flex-1">
                {order.orderItems.map((item) => (
                  <div key={item.id}>
                    <div className="flex justify-between items-center">
                      <p>{item.productName}</p>
                      <p>Quantité: {item.quantity}</p>
                    </div>
                    <div className="flex justify-end">
                      <p>{(item.price * item.quantity).toFixed(2)}$</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t">
                <p className="font-semibold">
                  {new Date(order.createdAt).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-semibold">Total:</span>
                  {order.totalAmount.toFixed(2)}€
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  {order.status === "paid" ? "Payé" : "En cours de paiement"}
                </p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
