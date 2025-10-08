export const dynamic = "force-dynamic";
export const runtime = "nodejs";

import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const { productId } = await request.json();

    if (!productId) {
      return NextResponse.json(
        { error: "ID du produit requis" },
        { status: 400 }
      );
    }

    const deletedFavorite = await prisma.favorite.delete({
      where: {
        userId_productId: {
          userId: session.user.id,
          productId: productId,
        },
      },
    });

    return NextResponse.json({
      message: "Produit retiré des favoris",
      deletedFavorite,
    });
  } catch (error) {
    console.error("Erreur suppression favoris:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
