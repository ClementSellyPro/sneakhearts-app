export interface CartItem {
  id: string;
  quantity: number;
  priceAtTime: number;
  currentPrice: number;
  subtotal: number;
  priceChanged: boolean;
  size: string;
  addedAt: Date;
  product: {
    id: string;
    name: string;
    brand: string;
    colorway: string;
    image: string;
  };
}

export interface CartItemResponse {
  cartItems: CartItem[];
  total: number;
  itemCount: number;
}
