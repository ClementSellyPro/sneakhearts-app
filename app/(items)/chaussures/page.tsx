import { prisma } from "@/lib/prisma";
import ProductList from "../_components/ProductList";
import { ProductWithVariations } from "@/model/ProductType";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
