import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import { ProductSize, ProductVariation } from "@prisma/client";

export type VariationsType = ProductVariation & {
  sizes: ProductSize[];
};

interface ItemVariationProps {
  items: VariationsType[];
  currentImage: string;
  setCurrentImage: Dispatch<SetStateAction<number>>;
}

export default function ItemMiniatureVariation({
  items,
  currentImage,
  setCurrentImage,
}: ItemVariationProps) {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <Image
          key={item.id}
          src={item.thumbnailUrl}
          alt="Variations"
          width={50}
          height={50}
          className={`rounded-md hover:border hover:border-amber-500 ${
            currentImage === item.largeUrl ? "border border-amber-500" : ""
          }`}
          onMouseOver={() => setCurrentImage(items.indexOf(item))}
        />
      ))}
    </div>
  );
}
