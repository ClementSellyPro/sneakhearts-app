import { SeedProduct } from "../types";

export const clothingProducts: SeedProduct[] = [
  {
    productId: "adidas-t-shirt-power-oversize",
    name: "T-Shirt Power Oversize",
    brand: "Adidas",
    basePrice: 29.99,
    category: "clothing",
    gender: "Male",
    variations: [
      {
        id: "power-oversize-blue",
        colorway: "Bleu",
        price: 29.99,
        salePrice: 24.99,
        thumbnailUrl:
          "/clothing/thumbnails/T-shirt_Power_Oversize_Bleu_JV9685_sm.webp",
        largeUrl: "/clothing/large/T-shirt_Power_Oversize_Bleu_JV9685.webp",
        alt: "Adidas T-Shirt Power Oversize Bleu",
        sizes: [
          { size: "XS", inStock: true, quantity: 12 },
          { size: "S", inStock: true, quantity: 25 },
          { size: "M", inStock: true, quantity: 30 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: true, quantity: 8 },
        ],
      },
      {
        id: "power-oversize-black",
        colorway: "Noir",
        price: 29.99,
        salePrice: 24.99,
        thumbnailUrl:
          "/clothing/thumbnails/T-shirt_Power_Oversize_Noir_JN3680_sm.webp",
        largeUrl: "/clothing/large/T-shirt_Power_Oversize_Noir_JN3680.webp",
        alt: "Adidas T-Shirt Power Oversize Noir",
        sizes: [
          { size: "XS", inStock: true, quantity: 2 },
          { size: "S", inStock: true, quantity: 18 },
          { size: "M", inStock: true, quantity: 28 },
          { size: "L", inStock: true, quantity: 27 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: true, quantity: 8 },
        ],
      },
    ],
  },
];
