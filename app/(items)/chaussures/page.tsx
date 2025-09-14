import { PrismaClient } from "@prisma/client";
import ProductList from "../components/ProductList";
import { ProductWithVariations } from "@/model/ProductType";

const prisma = new PrismaClient();

export default async function ChaussuresPage() {
  const initialShoes: ProductWithVariations[] = await prisma.product.findMany({
    where: { category: "Shoes" },
    include: {
      variations: {
        include: {
          sizes: true,
        },
      },
    },
  });

  return <ProductList initialProduct={initialShoes} category="Shoes" />;
}
