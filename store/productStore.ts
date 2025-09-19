import { ProductWithVariations } from "@/model/ProductType";
import { create } from "zustand";

interface ProductFilters {
  genders: string[];
  sortBy: "price-asc" | "price-desc" | "promotion";
}

interface ProductState {
  shoes: ProductWithVariations[];
  clothing: ProductWithVariations[];
  currentCategory: "Shoes" | "Clothing" | null;
  isLoading: boolean;

  filters: ProductFilters;
  filteredProducts: ProductWithVariations[];
}

interface ProductActions {
  setShoes: (producs: ProductWithVariations[]) => void;
  setClothing: (producs: ProductWithVariations[]) => void;
  setCurrentCategory: (category: "Shoes" | "Clothing") => void;
  setGenderFilter: (genders: string[]) => void;
  setSortBy: (sortBy: ProductFilters["sortBy"]) => void;
  setLoading: (loading: boolean) => void;

  getCurrentProducts: () => ProductWithVariations[];
  getProductById: (id: string) => ProductWithVariations | undefined;
  getFilteredProducts: () => ProductWithVariations[];
  getAvailableGenders: () => string[];

  resetFilters: () => void;
  applyFilters: () => void;
}

const defaultFilters: ProductFilters = {
  genders: [],
  sortBy: "price-asc",
};

type ProductStore = ProductState & ProductActions;

export const useProductStore = create<ProductStore>((set, get) => ({
  shoes: [],
  clothing: [],
  currentCategory: null,
  isLoading: false,
  filters: defaultFilters,
  filteredProducts: [],

  setShoes: (products) => set({ shoes: products }),
  setClothing: (products) => set({ clothing: products }),
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
    get().applyFilters();
  },
  setLoading: (loading) => set({ isLoading: loading }),

  getCurrentProducts: () => {
    const { shoes, clothing, currentCategory } = get();
    switch (currentCategory) {
      case "Shoes":
        return shoes;
      case "Clothing":
        return clothing;
      default:
        return [...shoes, ...clothing];
    }
  },
  getProductById(id: string) {
    const state = get();
    const products = [...state.shoes, ...state.clothing];
    return products.find((product) =>
      product.variations.find((variation) => variation.id === id)
    );
  },
  setGenderFilter: (genders: string[]) => {
    set((state) => ({
      filters: { ...state.filters, genders },
    }));
    get().applyFilters();
  },
  setSortBy: (sortBy: ProductFilters["sortBy"]) => {
    set((state) => ({
      filters: { ...state.filters, sortBy },
    }));
    get().applyFilters();
  },
  resetFilters: () => {
    set({ filters: defaultFilters });
    get().applyFilters();
  },
  applyFilters: () => {
    const state = get();
    const currentProducts = state.getCurrentProducts();
    let filtered = [...currentProducts];

    // Gender filter
    if (state.filters.genders.length > 0) {
      filtered = filtered.filter((product) =>
        state.filters.genders.some(
          (gender) => gender.toLowerCase() === product.gender.toLowerCase()
        )
      );
    }

    // Price sorting
    if (
      state.filters.sortBy === "price-asc" ||
      state.filters.sortBy === "price-desc"
    ) {
      filtered.sort((a, b) => {
        const minPriceA = Math.min(
          ...a.variations.map((v) => v.salePrice || v.price)
        );
        const minPriceB = Math.min(
          ...b.variations.map((v) => v.salePrice || v.price)
        );

        if (state.filters.sortBy === "price-asc") {
          return minPriceA - minPriceB;
        } else {
          return minPriceB - minPriceA;
        }
      });
    } else if (state.filters.sortBy === "promotion") {
      filtered.sort((a, b) => {
        const hasPromotionA = a.variations.some(
          (v) => v.salePrice && v.salePrice < v.price
        );
        const hasPromotionB = b.variations.some(
          (v) => v.salePrice && v.salePrice < v.price
        );

        if (hasPromotionA && !hasPromotionB) return -1;
        if (!hasPromotionA && hasPromotionB) return 1;
        return 0;
      });
    }

    set({ filteredProducts: filtered });
  },

  getFilteredProducts: () => {
    return get().filteredProducts;
  },

  getAvailableGenders: () => {
    const state = get();
    const allProducts = [...state.shoes, ...state.clothing];
    return [...new Set(allProducts.map((p) => p.gender))];
  },
}));
