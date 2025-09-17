"use client";

import Button from "@/components/ui/Button";
import { useProducts } from "@/hooks/UseProducts";
import { ProductWithVariations } from "@/model/ProductType";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import VariationList from "@/components/product-page/VariationList";

export default function ProductPage() {
  const param = useParams();
  const { getProductById } = useProducts();
  const [productData, setProductData] = useState<ProductWithVariations>();
  const [currentVariation, setCurrentVariation] = useState<string>(
    param.id!.toString()
  );

  const productVariation = productData?.variations.find(
    (variation) => variation.id === currentVariation
  );

  useEffect(() => {
    const currentProductData: ProductWithVariations | undefined =
      getProductById(param.id!.toString());
    setProductData(currentProductData);
  }, [setProductData, getProductById, param.id]);

  if (!productData) return <p>Chargement...</p>;

  return (
    <div className="flex items-start justify-center gap-20 pt-20 pb-32">
      <div className="h-[500px] w-[500px] rounded-xl overflow-hidden">
        <Image
          className="rounded-xl hover:scale-110 transition-all duration-300"
          src={productVariation!.largeUrl}
          alt={productVariation!.alt}
          width={500}
          height={500}
        />
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <p className="text-gray-500 text-sm">
            {productData.category === "Shoes" ? "Chaussure" : "Vêtement"}
          </p>
          <h1 className="font-semibold text-2xl">{productData!.name}</h1>
          <p
            className={`font-semibold text-lg ${
              productVariation?.salePrice ? "text-red-500" : ""
            }`}
          >
            {productVariation?.salePrice ?? productVariation?.price}$
            <span className="text-sm text-black line-through">
              {" "}
              {productVariation?.salePrice
                ? productVariation?.price + "$"
                : null}
            </span>
          </p>
        </div>
        <div className="flex flex-col gap-2">
          <h2>Coloris disponible</h2>
          <VariationList
            items={productData.variations}
            currentImageId={currentVariation}
            setCurrentVariation={setCurrentVariation}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h2>Sélectionner la taille</h2>
          <div className="grid grid-cols-4 gap-4">
            {productVariation?.sizes.map((size) => (
              <div
                key={size.id}
                className={`border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-black hover:text-white ${
                  !size.inStock && "line-through bg-gray-100 opacity-60"
                }`}
              >
                {size.size}
              </div>
            ))}
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
