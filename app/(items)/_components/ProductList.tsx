"use client";

import ItemCard from "./ItemCard";
import { useGetProducts, useProducts } from "@/hooks/UseProducts";
import { ProductWithVariations } from "@/model/ProductType";
import { useEffect } from "react";

interface ProductListProps {
  initialProduct: ProductWithVariations[];
  category: "Shoes" | "Clothing";
}

export default function ProductList({
  initialProduct,
  category,
}: ProductListProps) {
  useGetProducts(initialProduct, category);

  const { getFilteredProducts, applyFilters, isLoading } = useProducts();

  const filteredProducts = getFilteredProducts();

  useEffect(() => {
    applyFilters();
  }, [category, applyFilters]);

  if (isLoading) return <div>Chargement...</div>;

  return (
    <div className="py-8 grid grid-cols-4">
      {filteredProducts.map((product) => (
        <ItemCard key={product.id} product={product} category={category} />
      ))}
    </div>
  );
}
