"use client";

import FavoriteCard from "@/components/favorites/FavoriteCard";
import { useSession } from "@/lib/auth-client";
import { Favorite, FavoritesResponse } from "@/model/FavoriteType";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [favoritesData, setFavoritesData] = useState<Favorite[]>([]);
  const [favoritesLoading, setFavoritesLoading] = useState(false);

  async function getFavorites(): Promise<Favorite[]> {
    try {
      const response = await fetch("/api/favorites");

      if (!response.ok) {
        throw new Error("Erreur lors de la recuperation des favoris");
      }
      const data: FavoritesResponse = await response.json();
      return data.favorites;
    } catch (error) {
      console.error("Erreur : ", error);
      return [];
    }
  }

  async function loadFavorites() {
    setFavoritesLoading(true);

    try {
      const favorites = await getFavorites();
      setFavoritesData(favorites);
    } catch (error) {
      console.error("Erreur: ", error);
      setFavoritesData([]);
    } finally {
      setFavoritesLoading(false);
    }
  }

  useEffect(() => {
    if (!sessionLoading && session?.user) {
      loadFavorites();
    } else {
      setFavoritesData([]);
    }
    //eslint-disable-next-line
  }, []);

  async function onDeleteFavItem(favoriteId: string) {
    try {
      const response = await fetch("/api/favorites", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: favoriteId }),
      });

      if (!response.ok) {
        alert("Erreur lors de la suppression.");
      } else {
        setFavoritesData(
          favoritesData.filter((fav) => fav.product.id !== favoriteId)
        );
      }
    } catch (error) {
      console.error("Erreur: ", error);
      throw new Error();
    }
  }

  if (favoritesLoading) return <p>Chargement...</p>;

  return (
    <div className="flex justify-between h-screen px-52 py-18">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Articles Favoris</h1>

        <div className="grid grid-cols-3 gap-4">
          {favoritesData.length > 0 ? (
            favoritesData.map((fav) => (
              <FavoriteCard
                onDeleteFavItem={onDeleteFavItem}
                favorite={fav.product}
                key={fav.id}
              />
            ))
          ) : (
            <p>
              Il n&apos;y a aucun article ajouté comme favori pour le moment.
            </p>
          )}
        </div>

        {!session?.user ? (
          <p>
            <Link href={"/login"} className="font-semibold hover:underline">
              Se connecter
            </Link>{" "}
            ou{" "}
            <Link href={"/register"} className="font-semibold hover:underline">
              créer un compte
            </Link>{" "}
            pour ajouter des articles.
          </p>
        ) : null}
      </div>
    </div>
  );
}
