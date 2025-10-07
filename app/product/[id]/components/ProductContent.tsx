"use client";

import Button from "@/components/ui/Button";
import {
  ProductWithCurrentVariation,
  ProductWithVariations,
} from "@/model/ProductType";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import VariationList from "@/components/product-page/VariationList";

interface ProductContentProps {
  initialData: ProductWithCurrentVariation;
}

export default function ProductContent({ initialData }: ProductContentProps) {
  const router = useRouter();
  const { data: session } = useSession();
  const [productData, setProductData] = useState<ProductWithVariations>();
  const [selectedSize, setSelectedSize] = useState("");
  const [currentVariation, setCurrentVariation] = useState("");

  const [errorSizeMessage, setErrorSizeMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCart, setIsLoadingCart] = useState(false);

  const productVariation = initialData.currentVariation;

  useEffect(() => {
    setProductData(initialData);
    //eslint-disable-next-line
  }, []);

  if (!productData) return <p>Chargement...</p>;

  function onSelectSize(e: React.MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    setSelectedSize(target.innerText);
  }

  async function onAddToCart() {
    setErrorSizeMessage(null);

    if (!selectedSize) {
      setErrorSizeMessage("Veuillez sélectionner une taille.");
      return;
    }

    if (!session?.user) {
      router.push("/register");
      return;
    }

    try {
      setIsLoadingCart(true);

      const response = await fetch("/api/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variationId: productVariation?.id,
          size: selectedSize,
          quantity: 1,
        }),
      });

      if (response.ok) {
        alert("Produit ajouté au panier.");
      } else {
        alert("Une erreur s'est produit en ajoutant le produit au panier.");
      }
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setIsLoadingCart(false);
    }
  }

  async function onAddFavorite() {
    if (!session?.user) {
      router.push("/register");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: productData?.id }),
      });

      if (response.ok) {
        alert("Produit ajouté aux favoris");
      } else {
        alert("Une erreur s'est produit en ajoutant le produit aux favoris");
      }
    } catch (error) {
      console.error("Erreur : ", error);
    } finally {
      setIsLoading(false);
    }
  }

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
                onClick={(e: React.MouseEvent<HTMLDivElement>) =>
                  onSelectSize(e)
                }
                className={`border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-black hover:text-white ${
                  !size.inStock && "line-through bg-gray-100 opacity-60"
                }  ${
                  selectedSize === size.size
                    ? "bg-black text-white font-semibold"
                    : ""
                }`}
              >
                {size.size}
              </div>
            ))}
          </div>
          <div className="text-red-500">
            {errorSizeMessage && errorSizeMessage}
          </div>
        </div>

        <div className="flex flex-col gap-4 w-full">
          <Button type="button" onClick={onAddToCart} className="w-full">
            {isLoadingCart ? "Ajout..." : "Ajouter au panier"}
          </Button>
          <button
            onClick={onAddFavorite}
            className="px-8 py-2 rounded-full text-lg hover:bg-gray-200 cursor-pointer border"
          >
            {isLoading ? "Ajout..." : "Ajouter aux favoris"}
          </button>
        </div>
      </div>
    </div>
  );
}
