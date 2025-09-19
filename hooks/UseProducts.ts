"use client";

import { ProductWithVariations } from "@/model/ProductType";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export const useGetProducts = (
  initialProducts: ProductWithVariations[],
  category: "Shoes" | "Clothing"
) => {
  const {
    setShoes,
    setClothing,
    setCurrentCategory,
    shoes,
    clothing,
    getProductById,
  } = useProductStore();

  useEffect(() => {
    setCurrentCategory(category);

    if (category === "Shoes" && shoes.length === 0) {
      setShoes(initialProducts);
    }

    if (category === "Clothing" && clothing.length === 0) {
      setClothing(initialProducts);
    }
  }, [
    initialProducts,
    category,
    setShoes,
    setClothing,
    setCurrentCategory,
    getProductById,
    shoes.length,
    clothing.length,
  ]);
};

export const useProducts = () => {
  const {
    getCurrentProducts,
    currentCategory,
    getProductById,
    getFilteredProducts,
    applyFilters,
    isLoading,
  } = useProductStore();

  return {
    products: getCurrentProducts(),
    currentCategory,
    getProductById,
    getFilteredProducts,
    applyFilters,
    isLoading,
  };
};
