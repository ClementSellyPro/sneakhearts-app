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
      return NextResponse.json({ favorites: [] });
    }

    const favorites = await prisma.favorite.findMany({
      where: {
        userId: session.user.id,
      },
      select: {
        productId: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      favoriteProductIds: favorites.map((f) => f.productId),
      favorites,
    });
  } catch (error) {
    console.error("Erreur récupération favoris:", error);
    return NextResponse.json({ favorites: [] });
  }
}
