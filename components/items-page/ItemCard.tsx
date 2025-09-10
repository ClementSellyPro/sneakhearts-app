"use client";

import Image from "next/image";
import ItemMiniatureVariation from "./ItemMiniatureVariations";
import { useEffect, useState } from "react";
import { Product, ProductSize, ProductVariation } from "@prisma/client";

export type ProductWithVariations = Product & {
  variations: (ProductVariation & {
    sizes: ProductSize[];
  })[];
};

interface ItemCardProps {
  product: ProductWithVariations;
}

export default function ItemCard({ product }: ItemCardProps) {
  const [currentImage, setCurrentImage] = useState<string>(
    product.variations[0].largeUrl
  );

  useEffect(() => {
    console.log(product);
  }, [currentImage]);

  return (
    <div className="group w-fit pb-8 cursor-pointer relative">
      {/* onMouseLeave={() => setCurrentImage(nike[0].full)} */}
      <div className="border border-gray-300 group-hover:rounded-lg overflow-hidden transition-all">
        <Image
          src={currentImage}
          alt="Sneakers Photo"
          width={340}
          height={340}
          className="group-hover:scale-120 transition-all duration-500"
        />
      </div>
      <div className="flex flex-col gap-2 pt-4 group-hover:pt-1 group-hover:absolute bottom-2 group-hover:z-20 bg-white w-full">
        <p className="text-sm text-gray-400 group-hover:hidden">
          Chaussure Homme
        </p>
        <div className="hidden group-hover:block">
          {/* <ItemMiniatureVariation
            items={nike}
            currentImage={currentImage}
            setCurrentImage={setCurrentImage}
          /> */}
        </div>
        <div className="flex justify-between font-semibold">
          <p>{product.name}</p>
          <p>129,99$</p>
        </div>
      </div>
    </div>
  );
}
