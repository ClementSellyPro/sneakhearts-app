import { ProductWithCurrentVariation } from "@/model/ProductType";
import ProductContent from "./_components/ProductContent";
import { PrismaClient } from "@prisma/client";
import { notFound } from "next/navigation";

const prisma = new PrismaClient();

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const variation = await prisma.productVariation.findUnique({
    where: { id: id },
    include: {
      product: {
        include: {
          variations: {
            include: {
              sizes: true,
            },
          },
        },
      },
      sizes: true,
    },
  });

  if (!variation) {
    notFound();
  }

  const initialData: ProductWithCurrentVariation = {
    ...variation.product,
    currentVariation: variation,
  };

  return <ProductContent initialData={initialData} />;
}
