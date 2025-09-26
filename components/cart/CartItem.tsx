import { CartItemType } from "@/model/CarItemType";

interface CartItemProps {
  cartItemData: CartItemType;
}

export default function CartItem({ cartItemData }: CartItemProps) {
  return (
    <div>
      <p>{cartItemData.product.name}</p>
    </div>
  );
}
