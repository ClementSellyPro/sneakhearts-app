import { CartItemType } from "@/model/CarItemType";
import Image from "next/image";

interface CartItemProps {
  cartItemData: CartItemType;
}

export default function CartItem({ cartItemData }: CartItemProps) {
  return (
    <div className="flex border-b border-gray-300 pb-4">
      <Image
        src={cartItemData.product.image}
        alt={cartItemData.product.name}
        width={100}
        height={100}
        className="rounded-xl cursor-pointer hover:opacity-80"
      />
      <div className="p-4 flex-1 cursor-pointer hover:opacity-80">
        <p className="font-semibold">{cartItemData.product.name}</p>
        <p className="text-sm text-gray-500">{cartItemData.product.brand}</p>
      </div>
      <div className="flex justify-center items-center font-semibold">
        <p className="p-4">{cartItemData.currentPrice}$</p>
      </div>

      <div className="flex justify-center items-center font-semibold p-4">
        <Image
          src={"/icon/cross.svg"}
          alt="Retirer"
          width={15}
          height={15}
          className="cursor-pointer hover:opacity-60"
        />
      </div>
    </div>
  );
}
