import { ProductWithVariations } from "@/model/ProductType";
import { create } from "zustand";

interface ProductState {
  shoes: ProductWithVariations[];
  clothing: ProductWithVariations[];
  currentCategory: "Shoes" | "Clothing" | null;
  isLoading: boolean;

  setShoes: (producs: ProductWithVariations[]) => void;
  setClothing: (producs: ProductWithVariations[]) => void;
  setCurrentCategory: (category: "Shoes" | "Clothing") => void;
  setLoading: (loading: boolean) => void;

  getCurrentProducts: () => ProductWithVariations[];
  getProductById: (id: string) => ProductWithVariations | undefined;
}

export const useProductStore = create<ProductState>((set, get) => ({
  shoes: [],
  clothing: [],
  currentCategory: null,
  isLoading: false,

  setShoes: (products) => set({ shoes: products }),
  setClothing: (products) => set({ clothing: products }),
  setCurrentCategory: (category) => set({ currentCategory: category }),
  setLoading: (loading) => set({ isLoading: loading }),

  getCurrentProducts: () => {
    const { shoes, clothing, currentCategory } = get();
    return currentCategory === "Shoes" ? shoes : clothing;
  },
  getProductById(id: string) {
    const state = get();
    const products = [...state.shoes, ...state.clothing];
    return products.find((product) =>
      product.variations.find((variation) => variation.id === id)
    );
  },
}));
