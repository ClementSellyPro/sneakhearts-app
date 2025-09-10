import { SeedProduct } from "../../types";

export const clothingMixte: SeedProduct[] = [
  {
    productId: "t-shirt-paris",
    name: "T-Shirt Paris",
    brand: "Adidas",
    basePrice: 29.99,
    category: "clothing",
    gender: "Mixte",
    variations: [
      {
        id: "t-shirt-paris-white",
        colorway: "Blanc",
        price: 29.99,
        salePrice: 24.99,
        thumbnailUrl: "/clothing/thumbnails/T-shirt_Paris_Blanc_IZ0405_sm.webp",
        largeUrl: "/clothing/large/T-shirt_Paris_Blanc_IZ0405.webp",
        alt: "Adidas T-Shirt Paris Blanc",
        sizes: [
          { size: "XS", inStock: true, quantity: 12 },
          { size: "S", inStock: true, quantity: 25 },
          { size: "M", inStock: true, quantity: 30 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: true, quantity: 8 },
        ],
      },
    ],
  },
  {
    productId: "t-shirt-tour",
    name: "T-Shirt Tour 3 Stripes",
    brand: "Adidas",
    basePrice: 29.99,
    category: "clothing",
    gender: "Mixte",
    variations: [
      {
        id: "t-shirt-tour-black",
        colorway: "Noir",
        price: 29.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/T-SHIRT_TOUR_3-STRIPES_LS_Noir_KT3428_sm.webp",
        largeUrl: "/clothing/large/T-SHIRT_TOUR_3-STRIPES_LS_Noir_KT3428.webp",
        alt: "Adidas T-Shirt Tour 3 Stripes",
        sizes: [
          { size: "XS", inStock: true, quantity: 8 },
          { size: "S", inStock: true, quantity: 21 },
          { size: "M", inStock: true, quantity: 30 },
          { size: "L", inStock: true, quantity: 12 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: false, quantity: 0 },
        ],
      },
    ],
  },
];
