"use client";

import { FavoriteProduct } from "@/model/FavoriteType";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface FavoriteCardProps {
  favorite: FavoriteProduct;
  onDeleteFavItem(favoriteId: string): Promise<void>;
}

export default function FavoriteCard({
  favorite,
  onDeleteFavItem,
}: FavoriteCardProps) {
  const router = useRouter();

  function handleRedirection(e: React.MouseEvent<HTMLElement>) {
    const target = e.target as HTMLElement;
    console.log(target);
    if (!target.classList.contains("button-delete")) {
      router.push(`/product/${favorite.productId}`);
    }
  }

  return (
    <div
      onClick={(e: React.MouseEvent<HTMLElement>) => handleRedirection(e)}
      className="relative flex gap-4 items-start pr-4 border rounded-xl  text-gray-200 border-gray-300 overflow-hidden cursor-pointer hover:border-gray-500"
    >
      <Image
        src={favorite.largeImage!}
        alt={favorite.category}
        width={150}
        height={150}
      />
      <div className="flex flex-col pt-4 text-black">
        <span className="text-lg font-semibold">{favorite.name}</span>
        <span className="text-sm text-gray-500">
          {favorite.category === "Shoes" ? "Chaussure" : "Vêtement"}
        </span>
        <span className="font-semibold">{favorite.currentPrice}</span>

        <button
          className="button-delete absolute bottom-2 right-2 w-fit px-4 text-sm border rounded-full border-red-500 hover:text-red-500"
          type="button"
          onClick={() => onDeleteFavItem(favorite.id)}
        >
          <Trash2 className="button-delete w-4" />
        </button>
      </div>
    </div>
  );
}
