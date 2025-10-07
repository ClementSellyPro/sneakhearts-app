import Image from "next/image";
import { ProductSize, ProductVariation } from "@prisma/client";
import Link from "next/link";

export type VariationsType = ProductVariation & {
  sizes: ProductSize[];
};

interface ItemVariationProps {
  items: VariationsType[];
  currentImageId: string;
}

export default function VariationList({
  items,
  currentImageId,
}: ItemVariationProps) {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <Link key={item.id} href={`/product/${item.id}`}>
          <Image
            src={item.thumbnailUrl}
            alt="Variations"
            width={50}
            height={50}
            className={`rounded-md hover:border hover:border-amber-500 ${
              currentImageId === item.id ? "border border-amber-500" : ""
            }`}
          />
        </Link>
      ))}
    </div>
  );
}
