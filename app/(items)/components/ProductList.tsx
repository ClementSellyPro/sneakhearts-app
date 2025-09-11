import ItemCard from "@/components/items-page/ItemCard";
import { Product, ProductSize, ProductVariation } from "@prisma/client";

export type ProductWithVariations = Product & {
  variations: (ProductVariation & {
    sizes: ProductSize[];
  })[];
};

interface ProductListProps {
  initialProduct: ProductWithVariations[];
  category: string;
}

export default function ProductList({
  initialProduct,
  category,
}: ProductListProps) {
  return (
    <div className="py-8 grid grid-cols-4">
      {initialProduct.map((product) => (
        <ItemCard key={product.id} product={product} category={category} />
      ))}
    </div>
  );
}
