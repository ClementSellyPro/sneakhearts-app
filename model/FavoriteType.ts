export interface FavoriteProduct {
  id: string;
  productId: string;
  name: string;
  brand: string;
  basePrice: number;
  category: string;
  gender: string;
  image: string | null;
  largeImage: string | null;
  currentPrice: number;
  colorway: string | null;
}

export interface Favorite {
  id: string;
  addedAt: string;
  product: FavoriteProduct;
}

export interface FavoritesResponse {
  favorites: Favorite[];
}
