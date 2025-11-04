"use client";

import Image from "next/image";
import ItemMiniatureVariation from "./ItemMiniatureVariations";
import { useState } from "react";
import { ProductWithVariations } from "@/model/ProductType";
import Link from "next/link";

interface ItemCardProps {
  product: ProductWithVariations;
  category: string;
}

export default function ItemCard({ product, category }: ItemCardProps) {
  const [currentImage, setCurrentImage] = useState<number>(0);

  const currentVariation = product.variations[currentImage];

  let gender: string = product.gender;
  if (gender === "Male") {
    gender = "Homme";
  } else if (gender === "Female") {
    gender = "Femme";
  } else {
    gender = "Mixte";
  }

  return (
    <Link href={`product/${currentVariation.id}`}>
      <div
        className="group w-fit pb-8 cursor-pointer relative"
        onMouseLeave={() => setCurrentImage(0)}
      >
        <div className="relative border border-gray-300 group-hover:border-gray-500 group-hover:rounded-lg overflow-hidden transition-all">
          <Image
            src={currentVariation.largeUrl}
            alt="Sneakers Photo"
            width={340}
            height={340}
            className="group-hover:scale-110 transition-all duration-500"
          />
          {currentVariation.salePrice ? (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-sm rounded-full py-0.5 px-3">
              promotion
            </div>
          ) : null}
        </div>
        <div className="flex flex-col gap-2 pt-4 group-hover:pt-1 group-hover:absolute -bottom-14 group-hover:z-20 bg-white w-full">
          <p className="text-sm text-gray-400 md:group-hover:hidden">
            {category === "Shoes" ? "Chaussure" : "Vêtement"} {gender}
          </p>
          <div className="hidden md:group-hover:block">
            <ItemMiniatureVariation
              items={product.variations}
              currentImage={currentVariation.largeUrl}
              setCurrentImage={setCurrentImage}
            />
          </div>
          <div className="flex justify-between font-semibold">
            <p>
              {product.name.slice(0, 25)}
              {product.name.length > 25 ? "..." : null}
            </p>
            <p
              className={`${
                currentVariation.salePrice ? "text-red-500" : null
              }`}
            >
              {currentVariation.salePrice && (
                <span className="text-black font-light line-through">
                  {currentVariation.price}{" "}
                </span>
              )}
              {currentVariation.salePrice || currentVariation.price}€
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}
