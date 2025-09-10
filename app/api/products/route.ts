import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      variations: {
        include: {
          sizes: true,
        },
      },
    },
  });

  return Response.json(products);
}
