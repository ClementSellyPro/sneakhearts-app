import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    let product = await prisma.product.findFirst({
      where: {
        OR: [{ id: id }, { productId: id }],
      },
      include: {
        variations: {
          include: {
            sizes: true,
          },
        },
      },
    });

    if (!product) {
      const variation = await prisma.productVariation.findFirst({
        where: {
          id: id,
        },
        include: {
          product: {
            include: {
              variations: {
                include: {
                  sizes: true,
                },
              },
            },
          },
          sizes: true,
        },
      });

      if (variation) {
        product = variation.product;
      }
    }

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(product);
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Erreur serveur" }, { status: 500 });
  }
}
