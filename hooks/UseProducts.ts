import { ProductWithVariations } from "@/model/ProductType";
import { useProductStore } from "@/store/productStore";
import { useEffect } from "react";

export const useGetProducts = (initialProducts: ProductWithVariations[]) => {
  const { setProducts, products } = useProductStore();

  useEffect(() => {
    if (initialProducts.length > 0 && products.length === 0) {
      setProducts(initialProducts);
    }
  }, [initialProducts, setProducts, products.length]);
};

export const useProducts = () => {
  const { products, isLoading } = useProductStore();

  return {
    products,
    isLoading,
  };
};
