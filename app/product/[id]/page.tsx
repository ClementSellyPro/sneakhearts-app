"use client";

import Button from "@/components/ui/Button";
import { useProducts } from "@/hooks/UseProducts";
import { ProductWithVariations } from "@/model/ProductType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const param = useParams();
  const { getProductById } = useProducts();
  const [productData, setProductData] = useState<ProductWithVariations>();

  useEffect(() => {
    const currentProductData: ProductWithVariations | undefined =
      getProductById(param.id!.toString());
    setProductData(currentProductData);
  }, [setProductData, getProductById, param.id]);

  if (!productData) return <p>Chargement...</p>;

  return (
    <div className="flex items-start justify-center gap-20 pt-20 pb-32">
      <div className="border h-[500px] w-[500px] rounded-xl">Big image</div>

      <div className="flex flex-col gap-6">
        <div>
          <h1 className="font-semibold text-2xl">{productData!.name}</h1>
          <p className="text-gray-500">
            {productData.category === "Shoes" ? "Chaussure" : "Vêtement"}
          </p>
          <p>129.99$</p>
        </div>
        <div className="flex gap-4">
          <div className="w-14 h-14 bg-gray-300 rounded-md"></div>
          <div className="w-14 h-14 bg-gray-300 rounded-md"></div>
          <div className="w-14 h-14 bg-gray-300 rounded-md"></div>
          <div className="w-14 h-14 bg-gray-300 rounded-md"></div>
        </div>

        <div className="flex flex-col gap-4">
          <h2>Sélectionner la taille</h2>
          <div className="grid grid-cols-4 gap-4">
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
            <div className="border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-gray-100">
              38
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button className="w-full">Ajouter au panier</Button>
          <button className="px-8 py-2 rounded-full text-lg hover:bg-black hover:text-white cursor-pointer border">
            Ajouter aux favoris
          </button>
        </div>
      </div>
    </div>
  );
}
