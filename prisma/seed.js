import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const productsData = [
  {
    productId: "react-vision",
    name: "Nike React Vision",
    brand: "Nike",
    basePrice: 139.99,
    category: "Shoes",
    variations: [
      {
        id: "react-vision_white",
        colorway: "White",
        price: 139.0,
        salePrice: null,
        thumbnailUrl: "/sneakers/thumbnails/NIKE_REACT_VISION_white_sm.webp",
        largeUrl: "/sneakers/large/NIKE_REACT_VISION_white.webp",
        alt: "Nike React Vision White",
        sizes: [
          { size: "38", inStock: true, quantity: 5 },
          { size: "39", inStock: false, quantity: 0 },
          { size: "40", inStock: true, quantity: 8 },
          { size: "41", inStock: true, quantity: 12 },
          { size: "42", inStock: true, quantity: 6 },
          { size: "43", inStock: true, quantity: 15 },
          { size: "44", inStock: true, quantity: 4 },
          { size: "45", inStock: true, quantity: 7 },
          { size: "46", inStock: false, quantity: 3 },
          { size: "47", inStock: true, quantity: 2 },
        ],
      },
      {
        id: "react-vision-black",
        colorway: "Black",
        price: 139.99,
        salePrice: null,
        thumbnailUrl: "/sneakers/thumbnails/NIKE_REACT_VISION_black_sm.webp",
        largeUrl: "/sneakers/large/NIKE_REACT_VISION_black.webp",
        alt: "Nike React Vision Black",
        sizes: [
          { size: "38", inStock: false, quantity: 0 },
          { size: "39", inStock: true, quantity: 1 },
          { size: "40", inStock: true, quantity: 3 },
          { size: "41", inStock: true, quantity: 5 },
          { size: "42", inStock: true, quantity: 8 },
          { size: "43", inStock: true, quantity: 2 },
          { size: "44", inStock: true, quantity: 4 },
          { size: "45", inStock: false, quantity: 0 },
          { size: "46", inStock: true, quantity: 6 },
          { size: "47", inStock: true, quantity: 3 },
        ],
      },
    ],
  },

  // CLOTHING CATEGORY
  {
    productId: "adidas-t-shirt-power-oversize",
    name: "T-Shirt Power Oversize",
    brand: "Adidas",
    basePrice: 29.99,
    category: "clothing",
    variations: [
      {
        id: "power-oversize-blue",
        colorway: "Blue",
        price: 29.99,
        salePrice: 24.99,
        thumbnailUrl:
          "/clothing/thumbnails/T-shirt_Power_Oversize_Bleu_JV9685_sm.webp",
        largeUrl: "/clothing/large/T-shirt_Power_Oversize_Bleu_JV9685.webp",
        alt: "Adidas T-Shirt Power Oversize Blue",
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
        colorway: "Black",
        price: 29.99,
        salePrice: 24.99,
        thumbnailUrl:
          "/clothing/thumbnails/T-shirt_Power_Oversize_Noir_JN3680_sm.webp",
        largeUrl: "/clothing/large/T-shirt_Power_Oversize_Noir_JN3680.webp",
        alt: "Adidas T-Shirt Power Oversize Black",
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

async function main() {
  console.log("Seeding database...");

  for (const productData of productsData) {
    const { variations, ...product } = productData;

    console.log(`Creating product: ${product.name}`);

    const createdProduct = await prisma.product.create({
      data: {
        ...product,
        variations: {
          create: variations.map((variation) => {
            const { sizes, ...variationData } = variation;
            return {
              ...variationData,
              sizes: {
                create: sizes,
              },
            };
          }),
        },
      },
      include: {
        variations: {
          include: {
            sizes: true,
          },
        },
      },
    });

    console.log(
      `Created ${createdProduct.name} with ${createdProduct.variations.length} variations`
    );
  }

  console.log("Seeding completed!");
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
