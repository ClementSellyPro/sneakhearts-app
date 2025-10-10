import { PrismaClient } from "@prisma/client";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import FavoritesContent from "./_components/FavoritesContent";
import EmptyFavorites from "./_components/EmptyFavorites";

const prisma = new PrismaClient();

export default async function FavoritesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    return <EmptyFavorites />;
  }

  const favoriteItems = await prisma.favorite.findMany({
    where: { userId: session.user.id },
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
    orderBy: { createdAt: "desc" },
  });

  const formattedFavorites = favoriteItems.map((favorite) => ({
    id: favorite.id,
    addedAt: favorite.createdAt,
    product: {
      id: favorite.product.id,
      productId: favorite.product.variations[0].id,
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

  return <FavoritesContent favoritesListData={formattedFavorites} />;
}
