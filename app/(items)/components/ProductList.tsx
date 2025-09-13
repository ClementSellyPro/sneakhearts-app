import ItemCard from "@/components/items-page/ItemCard";
import { ProductWithVariations } from "@/model/ProductType";

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
