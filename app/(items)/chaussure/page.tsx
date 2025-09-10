import {
  PrismaClient,
  Product,
  ProductVariation,
  ProductSize,
} from "@prisma/client";
import ProductList from "../components/ProductList";

const prisma = new PrismaClient();

export type ProductWithVariations = Product & {
  variations: (ProductVariation & {
    sizes: ProductSize[];
  })[];
};

export default async function ChaussurePage() {
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
  console.log(initialShoes.length);

  return <ProductList initialProduct={initialShoes} />;
}
