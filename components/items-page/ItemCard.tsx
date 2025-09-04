"use client";

import Image from "next/image";
import ItemMiniatureVariation from "./ItemMiniatureVariations";
import { SneakerType } from "@/model/SneakerType";
import { useEffect, useState } from "react";

export default function ItemCard() {
  const nike: SneakerType[] = [
    {
      id: 1,
      thumbnail: "/sneakers/nike_red_yellow_thumb.jpg",
      full: "/sneakers/nike_red_yellow.jpg",
      alt: "Nike Air Max",
    },
    {
      id: 2,
      thumbnail: "/sneakers/sample1_thumb.jpg",
      full: "/sneakers/sample1.jpg",
      alt: "Nike Air Max",
    },
    {
      id: 3,
      thumbnail: "/sneakers/sample2_thumb.jpg",
      full: "/sneakers/sample2.jpg",
      alt: "Nike Air Max",
    },
  ];

  const [currentImage, setCurrentImage] = useState<string>(nike[0].full);

  useEffect(() => {}, [currentImage]);

  return (
    <div
      className="group w-fit pb-8 cursor-pointer relative"
      onMouseLeave={() => setCurrentImage(nike[0].full)}
    >
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
          <ItemMiniatureVariation
            items={nike}
            setCurrentImage={setCurrentImage}
          />
        </div>
        <div className="flex justify-between font-semibold">
          <p>Adidas NMD R1</p>
          <p>129,99$</p>
        </div>
      </div>
    </div>
  );
}
