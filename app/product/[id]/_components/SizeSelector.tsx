"use client";

import { ProductSize } from "@prisma/client";

interface sizeSelectorProps {
  productSizes: ProductSize[];
  selectedSize: string;
  onSelectSize: (size: string, inStock: boolean) => void;
  errorSizeMessage: null | string;
}

export default function SizeSelector({
  productSizes,
  selectedSize,
  onSelectSize,
  errorSizeMessage,
}: sizeSelectorProps) {
  return (
    <div className="flex flex-col gap-4">
      <h2>Sélectionner la taille</h2>
      <div className="grid grid-cols-4 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {productSizes.map((size) => (
          <div
            key={size.id}
            onClick={() => onSelectSize(size.size, size.inStock)}
            className={`border border-gray-300 rounded-md w-fit py-1.5 px-8 cursor-pointer hover:bg-black hover:text-white ${
              !size.inStock &&
              "line-through bg-gray-100 opacity-60 hover:cursor-not-allowed"
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
      <div className="text-red-500">{errorSizeMessage && errorSizeMessage}</div>
    </div>
  );
}
