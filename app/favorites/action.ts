"use client";
import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

const prisma = new PrismaClient();

export default async function deleteFavoriteItemAction(favoriteItemId: string) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user) {
      throw new Error("Non autorisé.");
    }

    const favoriteItem = prisma.favorite.findUnique({
      where: { id: favoriteItemId },
    });

    if (!favoriteItem) {
      throw new Error("Article non trouvé");
    }

    await prisma.favorite.delete({
      where: { id: favoriteItemId },
    });

    revalidatePath("favorites", "page");

    return { success: true };
  } catch (error) {
    console.error("Erreur : ", error);
    throw error;
  }
}
