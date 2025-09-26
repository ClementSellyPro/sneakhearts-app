export interface CartItemType {
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
  cartItems: CartItemType[];
  total: number;
  itemCount: number;
}
