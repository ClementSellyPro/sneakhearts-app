import { SneakerType } from "@/model/SneakerType";
import Image from "next/image";
import { Dispatch, SetStateAction } from "react";

interface ItemVariationProps {
  items: SneakerType[];
  setCurrentImage: Dispatch<SetStateAction<string>>;
}

export default function ItemMiniatureVariation({
  items,
  setCurrentImage,
}: ItemVariationProps) {
  return (
    <div className="flex gap-2">
      {items.map((item) => (
        <Image
          key={item.id}
          src={item.thumbnail}
          alt="Variations"
          width={50}
          height={50}
          className="rounded-md hover:border hover:border-amber-500"
          onMouseOver={() => setCurrentImage(item.full)}
        />
      ))}
    </div>
  );
}
