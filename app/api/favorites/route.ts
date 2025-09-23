import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const { productId } = await request.json();

    const product = await prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit non trouvé" },
        { status: 404 }
      );
    }

    const favorite = await prisma.favorite.create({
      data: {
        userId: session.user.id,
        productId: productId,
      },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            brand: true,
            basePrice: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Produit ajouté aux favoris",
      favorite,
    });
  } catch (error) {
    console.error("Erreur : ", error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json(
        { error: "Non autorisé. Veuillez vous connecter." },
        { status: 401 }
      );
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        product: {
          include: {
            variations: {
              take: 1,
              select: {
                id: true,
                colorway: true,
                thumbnailUrl: true,
                largeUrl: true,
                price: true,
                salePrice: true,
                alt: true,
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedFavorites = favorites.map((favorite) => ({
      id: favorite.id,
      addedAt: favorite.createdAt,
      product: {
        id: favorite.product.id,
        productId: favorite.product.productId,
        name: favorite.product.name,
        brand: favorite.product.brand,
        basePrice: favorite.product.basePrice,
        category: favorite.product.category,
        gender: favorite.product.gender,

        image: favorite.product.variations[0]?.thumbnailUrl || null,
        largeImage: favorite.product.variations[0]?.largeUrl || null,
        currentPrice:
          favorite.product.variations[0]?.salePrice ||
          favorite.product.variations[0]?.price ||
          favorite.product.basePrice,
        colorway: favorite.product.variations[0]?.colorway || null,
      },
    }));

    return NextResponse.json({
      favorites: formattedFavorites,
    });
  } catch (error) {
    console.error("Erreur recuperation favoris: ", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
