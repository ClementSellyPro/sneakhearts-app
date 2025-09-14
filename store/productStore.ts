import { ProductWithVariations } from "@/model/ProductType";
import { create } from "zustand";

interface ProductState {
  products: ProductWithVariations[];
  isLoading: boolean;

  setProducts: (producs: ProductWithVariations[]) => void;
  setLoading: (loading: boolean) => void;
}

export const useProductStore = create<ProductState>((set) => ({
  products: [],
  isLoading: false,

  setProducts: (products) => set({ products }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
