import Image from "next/image";
import { ProductSize, ProductVariation } from "@prisma/client";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

export type VariationsType = ProductVariation & {
  sizes: ProductSize[];
};

interface ItemVariationProps {
  items: VariationsType[];
  currentImage: string;
  setCurrentVariation: Dispatch<SetStateAction<number>>;
}

export default function VariationList({
  items,
  currentImage,
  setCurrentVariation,
}: ItemVariationProps) {
  return (
    <div className="flex gap-2">
      {items.map((item, index) => (
        <Link
          key={item.id}
          href={`/product/${item.id}`}
          onClick={() => setCurrentVariation(index)}
        >
          <Image
            src={item.thumbnailUrl}
            alt="Variations"
            width={50}
            height={50}
            className={`rounded-md hover:border hover:border-amber-500 ${
              currentImage === item.largeUrl ? "border border-amber-500" : ""
            }`}
          />
        </Link>
      ))}
    </div>
  );
}
