import { PrismaClient } from "@prisma/client";
import ProductList from "../components/ProductList";
import { ProductWithVariations } from "@/model/ProductType";

const prisma = new PrismaClient();

export default async function VetementsPage() {
  const initialClothing: ProductWithVariations[] =
    await prisma.product.findMany({
      where: { category: "clothing" },
      include: {
        variations: {
          include: {
            sizes: true,
          },
        },
      },
    });

  return <ProductList initialProduct={initialClothing} category="Vêtement" />;
}
