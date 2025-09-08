export interface SeedProduct {
  productId: string;
  name: string;
  brand: string;
  basePrice: number;
  category: string;
  gender: string;
  variations: SeedProductVariation[];
}

export interface SeedProductVariation {
  id: string;
  colorway: string;
  price: number;
  salePrice?: number | null;
  thumbnailUrl: string;
  largeUrl: string;
  alt: string;
  sizes: SeedProductSize[];
}

export interface SeedProductSize {
  size: string;
  inStock: boolean;
  quantity: number;
}
