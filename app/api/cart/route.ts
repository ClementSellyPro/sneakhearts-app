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

    const { variationId, size, quantity = 1 } = await request.json();

    if (!variationId) {
      return NextResponse.json(
        { error: "ID de variation requis" },
        { status: 400 }
      );
    }

    if (!size) {
      return NextResponse.json({ error: "Taille requise" }, { status: 400 });
    }

    if (quantity < 1) {
      return NextResponse.json(
        { error: "Quantité doit être supérieure à 0" },
        { status: 400 }
      );
    }

    const variation = await prisma.productVariation.findUnique({
      where: { id: variationId },
      include: {
        product: {
          select: {
            id: true,
            name: true,
            brand: true,
          },
        },
        sizes: {
          where: { size: size },
        },
      },
    });

    if (!variation) {
      return NextResponse.json(
        { error: "Variation de produit non trouvée" },
        { status: 404 }
      );
    }

    const currentPrice = variation.salePrice || variation.price;

    const sizeInfo = variation.sizes[0];
    if (!sizeInfo) {
      return NextResponse.json(
        { error: `Taille ${size} non disponible pour cette variation` },
        { status: 400 }
      );
    }

    if (!sizeInfo.inStock || sizeInfo.quantity < quantity) {
      return NextResponse.json(
        { error: `Stock insuffisant. Disponible: ${sizeInfo.quantity}` },
        { status: 400 }
      );
    }
    const existingCartItem = await prisma.cartItem.findUnique({
      where: {
        userId_variationId_size: {
          userId: session.user.id,
          variationId: variationId,
          size: size,
        },
      },
    });

    let cartItem;

    if (existingCartItem) {
      // Update quantity if item already exists
      const newQuantity = existingCartItem.quantity + quantity;

      // Check if new quantity exceeds stock
      if (newQuantity > sizeInfo.quantity) {
        return NextResponse.json(
          {
            error: `Quantité totale (${newQuantity}) dépasse le stock disponible (${sizeInfo.quantity})`,
          },
          { status: 400 }
        );
      }

      cartItem = await prisma.cartItem.update({
        where: {
          userId_variationId_size: {
            userId: session.user.id,
            variationId: variationId,
            size: size,
          },
        },
        data: {
          quantity: newQuantity,
          price: currentPrice,
        },
        include: {
          variation: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  brand: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json({
        message: "Quantité mise à jour dans le panier",
        cartItem,
        action: "updated",
      });
    } else {
      // Create new cart item
      cartItem = await prisma.cartItem.create({
        data: {
          userId: session.user.id,
          variationId: variationId,
          size: size,
          quantity: quantity,
          price: currentPrice,
        },
        include: {
          variation: {
            include: {
              product: {
                select: {
                  id: true,
                  name: true,
                  brand: true,
                },
              },
            },
          },
        },
      });

      return NextResponse.json({
        message: "Produit ajouté au panier",
        cartItem,
        action: "added",
      });
    }
  } catch (error) {
    console.error("Erreur : ", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: session.user.id },
      include: {
        variation: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    const total = cartItems.reduce((sum, item) => {
      return sum + item.price * item.quantity;
    }, 0);

    const formattedItems = cartItems.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      priceAtTime: item.price,
      currentPrice: item.variation.salePrice || item.variation.price,
      subtotal: item.price * item.quantity,
      priceChanged:
        item.price !== (item.variation.salePrice || item.variation.price),
      size: item.size,
      addedAt: item.createdAt,
      product: {
        id: item.variation.product.id,
        name: item.variation.product.name,
        brand: item.variation.product.brand,
        colorway: item.variation.colorway,
        image: item.variation.thumbnailUrl,
      },
    }));

    return NextResponse.json({
      cartItems: formattedItems,
      total,
      itemCount: cartItems.reduce((sum, item) => sum + item.quantity, 0),
    });
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      return NextResponse.json({ error: "Non autorise" }, { status: 401 });
    }

    const { cartItemId } = await request.json();

    if (!cartItemId) {
      return NextResponse.json(
        { error: "ID du l'article requis" },
        { status: 400 }
      );
    }

    const cartItem = await prisma.cartItem.findUnique({
      where: { id: cartItemId },
    });

    if (!cartItem) {
      return NextResponse.json(
        { error: "Article non trouve" },
        { status: 404 }
      );
    }

    if (cartItem.userId !== session.user.id) {
      return NextResponse.json(
        { error: "Non autorise a supprimer cet article" },
        { status: 403 }
      );
    }

    const deletedCartItem = await prisma.cartItem.delete({
      where: { id: cartItemId },
    });

    return NextResponse.json({
      message: "Produit retiré du panier",
      deletedCartItem,
    });
  } catch (error) {
    console.error("Erreur suppression panier:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
