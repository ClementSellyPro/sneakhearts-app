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

  console.log(orders);

  return (
    <div className="py-8">
      <p className="text-2xl font-semibold">Historique des commandes</p>
    </div>
  );
}
