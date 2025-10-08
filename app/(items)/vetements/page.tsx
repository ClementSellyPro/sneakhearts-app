import { prisma } from "@/lib/prisma";
import ProductList from "../components/ProductList";
import { ProductWithVariations } from "@/model/ProductType";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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

  return <ProductList initialProduct={initialClothing} category="Clothing" />;
}
