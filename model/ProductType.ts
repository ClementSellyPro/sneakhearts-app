export interface ProductType {
  id: string;
  productId: string;
  name: string;
  brand: string;
  basePrice: number;
  category: string;
  gender: string;
  createdAt: Date;
  updatedAt: Date;
  variations: ProductVariationType[];
}

export interface ProductVariationType {
  id: string;
  colorway: string;
  price: number;
  salePrice: number | null;
  thumbnailUrl: string;
  largeUrl: string;
  alt: string;
  sizes: ProductSizeType[];
  createdAt: Date;
  updatedAt: Date;
  productiId: string;
}

export interface ProductSizeType {
  id: string;
  size: string;
  inStock: boolean;
  quantity: number;
  variationId: string;
}
