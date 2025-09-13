import { Product, ProductVariation, ProductSize } from "@prisma/client";

export type ProductWithVariations = Product & {
  variations: (ProductVariation & {
    sizes: ProductSize[];
  })[];
};
