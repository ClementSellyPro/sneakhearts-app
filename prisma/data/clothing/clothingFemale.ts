import { SeedProduct } from "../../types";

export const clothingFemale: SeedProduct[] = [
  {
    productId: "pants-adicolor",
    name: "Pantalon ample Adicolor",
    brand: "Adidas",
    basePrice: 69.99,
    category: "clothing",
    gender: "Female",
    variations: [
      {
        id: "pants-adicolor-bordeaux",
        colorway: "Bordeaux",
        price: 69.99,
        salePrice: 64.99,
        thumbnailUrl:
          "/clothing/thumbnails/Pantalon_de_survetement_ample_Adicolor_Classic_Firebird_Bordeaux_KA7743_sm.webp",
        largeUrl:
          "/clothing/large/Pantalon_de_survetement_ample_Adicolor_Classic_Firebird_Bordeaux_KA7743.webp",
        alt: "Pantalon ample Adicolor Bordeaux",
        sizes: [
          { size: "XS", inStock: true, quantity: 12 },
          { size: "S", inStock: true, quantity: 25 },
          { size: "M", inStock: true, quantity: 30 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: false, quantity: 0 },
        ],
      },
      {
        id: "pants-adicolor-brown",
        colorway: "Marron",
        price: 69.99,
        salePrice: 64.99,
        thumbnailUrl:
          "/clothing/thumbnails/Pantalon_de_survetement_ample_Adicolor_Classic_Firebird_Marron_KD2526_sm.webp",
        largeUrl:
          "/clothing/large/Pantalon_de_survetement_ample_Adicolor_Classic_Firebird_Marron_KD2526.webp",
        alt: "Pantalon ample Adicolor Marron",
        sizes: [
          { size: "XS", inStock: true, quantity: 8 },
          { size: "S", inStock: true, quantity: 15 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: true, quantity: 6 },
        ],
      },
      {
        id: "pants-adicolor-orange",
        colorway: "Orange",
        price: 69.99,
        salePrice: 64.99,
        thumbnailUrl:
          "/clothing/thumbnails/Pantalon_de_survetement_ample_Adicolor_Classic_Firebird_Orange_JY2694_sm.webp",
        largeUrl:
          "/clothing/large/Pantalon_de_survetement_ample_Adicolor_Classic_Firebird_Orange_JY2694.webp",
        alt: "Pantalon ample Adicolor Oranges",
        sizes: [
          { size: "XS", inStock: false, quantity: 0 },
          { size: "S", inStock: true, quantity: 13 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 24 },
          { size: "XL", inStock: true, quantity: 18 },
          { size: "XXL", inStock: true, quantity: 8 },
        ],
      },
    ],
  },
  {
    productId: "pants-essentials",
    name: "Pantalon molleton Essentials",
    brand: "Adidas",
    basePrice: 54.99,
    category: "clothing",
    gender: "Female",
    variations: [
      {
        id: "pants-essentials-gray",
        colorway: "Gris",
        price: 54.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/Pantalon_molleton_Essentials_Gris_IY4988_sm.jpg",
        largeUrl:
          "/clothing/large/Pantalon_molleton_Essentials_Gris_IY4988.jpg",
        alt: "Pantalon molleton Essentials Gris",
        sizes: [
          { size: "XS", inStock: true, quantity: 12 },
          { size: "S", inStock: true, quantity: 25 },
          { size: "M", inStock: true, quantity: 30 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: false, quantity: 0 },
        ],
      },
      {
        id: "pants-essentials-brown",
        colorway: "Marron",
        price: 54.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/Pantalon_molleton_Essentials_Marron_JD1523_sm.webp",
        largeUrl:
          "/clothing/large/Pantalon_molleton_Essentials_Marron_JD1523.webp",
        alt: "Pantalon molleton Essentials Marron",
        sizes: [
          { size: "XS", inStock: true, quantity: 8 },
          { size: "S", inStock: true, quantity: 15 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: true, quantity: 6 },
        ],
      },
      {
        id: "pants-essentials-black",
        colorway: "Noir",
        price: 54.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/Pantalon_molleton_Essentials_Noir_IW0952_sm.webp",
        largeUrl:
          "/clothing/large/Pantalon_molleton_Essentials_Noir_IW0952.webp",
        alt: "Pantalon molleton Essentials Noir",
        sizes: [
          { size: "XS", inStock: false, quantity: 0 },
          { size: "S", inStock: true, quantity: 13 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 24 },
          { size: "XL", inStock: true, quantity: 18 },
          { size: "XXL", inStock: true, quantity: 8 },
        ],
      },
      {
        id: "pants-essentials-pink",
        colorway: "Rose",
        price: 54.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/Pantalon_molleton_Essentials_Rose_JD1525_sm.webp",
        largeUrl:
          "/clothing/large/Pantalon_molleton_Essentials_Rose_JD1525.webp",
        alt: "Pantalon molleton Essentials Rose",
        sizes: [
          { size: "XS", inStock: false, quantity: 0 },
          { size: "S", inStock: true, quantity: 6 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 24 },
          { size: "XL", inStock: true, quantity: 18 },
          { size: "XXL", inStock: false, quantity: 0 },
        ],
      },
    ],
  },
  {
    productId: "t-shirt-3-bandes",
    name: "T-Shirt 3 bandes",
    brand: "Adidas",
    basePrice: 32.99,
    category: "clothing",
    gender: "Female",
    variations: [
      {
        id: "t-shirt-3-bandes-white",
        colorway: "Blanc",
        price: 32.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/T-shirt_3_bandes_Blanc_IR8051_sm.webp",
        largeUrl: "/clothing/large/T-shirt_3_bandes_Blanc_IR8051.webp",
        alt: "T-shirt 3 bandes blanc",
        sizes: [
          { size: "XS", inStock: true, quantity: 8 },
          { size: "S", inStock: true, quantity: 15 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: true, quantity: 6 },
        ],
      },
      {
        id: "t-shirt-3-bandes-brown",
        colorway: "Marron",
        price: 32.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/T-shirt_3_bandes_Marron_JD4570_sm.webp",
        largeUrl: "/clothing/large/T-shirt_3_bandes_Marron_JD4570.webp",
        alt: "T-shirt 3 bandes marron",
        sizes: [
          { size: "XS", inStock: false, quantity: 0 },
          { size: "S", inStock: true, quantity: 13 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 24 },
          { size: "XL", inStock: true, quantity: 18 },
          { size: "XXL", inStock: true, quantity: 8 },
        ],
      },
      {
        id: "t-shirt-3-bandes-black",
        colorway: "Noir",
        price: 32.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/T-shirt_3_bandes_Noir_IU2420_sm.webp",
        largeUrl: "/clothing/large/T-shirt_3_bandes_Noir_IU2420.webp",
        alt: "T-shirt 3 bandes noir",
        sizes: [
          { size: "XS", inStock: false, quantity: 0 },
          { size: "S", inStock: true, quantity: 6 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 24 },
          { size: "XL", inStock: true, quantity: 18 },
          { size: "XXL", inStock: false, quantity: 0 },
        ],
      },
    ],
  },
  {
    productId: "veste-firebird",
    name: "Veste Classics Firebird",
    brand: "Adidas",
    basePrice: 79.99,
    category: "clothing",
    gender: "Female",
    variations: [
      {
        id: "veste-firebird-blue",
        colorway: "Bleu",
        price: 79.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/Veste_de_survetement_Adicolor_Classics_Firebird_Bleu_JC8263_sm.webp",
        largeUrl:
          "/clothing/large/Veste_de_survetement_Adicolor_Classics_Firebird_Bleu_JC8263.webp",
        alt: "Veste Classics Firebird Bleu",
        sizes: [
          { size: "XS", inStock: true, quantity: 12 },
          { size: "S", inStock: true, quantity: 25 },
          { size: "M", inStock: true, quantity: 30 },
          { size: "L", inStock: true, quantity: 22 },
          { size: "XL", inStock: true, quantity: 15 },
          { size: "XXL", inStock: false, quantity: 0 },
        ],
      },
      {
        id: "veste-firebird-black",
        colorway: "Noir",
        price: 79.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/Veste_de_survetement_Adicolor_Classics_Firebird_Noir_IL8764_sm.webp",
        largeUrl:
          "/clothing/large/Veste_de_survetement_Adicolor_Classics_Firebird_Noir_IL8764.webp",
        alt: "Veste Classics Firebird Noir",
        sizes: [
          { size: "XS", inStock: false, quantity: 0 },
          { size: "S", inStock: true, quantity: 13 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 24 },
          { size: "XL", inStock: true, quantity: 18 },
          { size: "XXL", inStock: true, quantity: 8 },
        ],
      },
      {
        id: "veste-firebird-red",
        colorway: "Rouge",
        price: 79.99,
        salePrice: null,
        thumbnailUrl:
          "/clothing/thumbnails/Veste_de_survetement_Adicolor_Classics_Firebird_Rouge_IR8079_sm.webp",
        largeUrl:
          "/clothing/large/Veste_de_survetement_Adicolor_Classics_Firebird_Rouge_IR8079.webp",
        alt: "Veste Classics Firebird Rouge",
        sizes: [
          { size: "XS", inStock: false, quantity: 0 },
          { size: "S", inStock: true, quantity: 6 },
          { size: "M", inStock: true, quantity: 20 },
          { size: "L", inStock: true, quantity: 24 },
          { size: "XL", inStock: true, quantity: 18 },
          { size: "XXL", inStock: false, quantity: 0 },
        ],
      },
    ],
  },
];
