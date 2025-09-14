"use client";

import ItemCard from "@/components/items-page/ItemCard";
import { useGetProducts, useProducts } from "@/hooks/UseProducts";
import { ProductWithVariations } from "@/model/ProductType";

interface ProductListProps {
  initialProduct: ProductWithVariations[];
  category: "Shoes" | "Clothing";
}

export default function ProductList({
  initialProduct,
  category,
}: ProductListProps) {
  useGetProducts(initialProduct, category);

  const { products, isLoading } = useProducts();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="py-8 grid grid-cols-4">
      {products.map((product) => (
        <ItemCard key={product.id} product={product} category={category} />
      ))}
    </div>
  );
}
