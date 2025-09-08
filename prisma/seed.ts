import { PrismaClient } from "@prisma/client";
import { shoesProducts } from "./data/shoes";
import { clothingProducts } from "./data/clothing";

const prisma = new PrismaClient();

const productsData = [...shoesProducts, ...clothingProducts];

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
