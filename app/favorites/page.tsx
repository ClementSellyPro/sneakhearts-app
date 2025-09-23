"use client";

import { useSession } from "@/lib/auth-client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function FavoritesPage() {
  const { data: session, isPending: sessionLoading } = useSession();
  const [favoritesData, setFavoritesData] = useState();

  async function getFavorites() {
    try {
      const response = await fetch("/api/favorites");

      if (!response.ok) {
        throw new Error("Erreur lors de la recuperation des favoris");
      }
      const data = response.json();
      return data;
    } catch (error) {
      console.error("Erreur : ", error);
      return [];
    }
  }

  useEffect(() => {
    const loadFavorites = async () => {
      const userFavorites = await getFavorites();
      setFavoritesData(userFavorites);
    };

    if (!sessionLoading && session?.user) {
      loadFavorites();
    }
  }, []);

  return (
    <div className="flex justify-between h-screen px-52 py-18">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Articles Favoris</h1>
        <p>Il n&apos;y a aucun article ajoute comme favoris pour le moment.</p>

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
        ) : (
          <div className="flex gap-4 flex-wrap">
            <div
              onClick={() => console.log(favoritesData)}
              className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500"
            >
              ITEM
            </div>
            <div className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500">
              ITEM
            </div>
            <div className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500">
              ITEM
            </div>
            <div className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500">
              ITEM
            </div>
            <div className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500">
              ITEM
            </div>
            <div className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500">
              ITEM
            </div>
            <div className="flex justify-center items-center border rounded-xl w-[250px] h-[300px] text-gray-200 border-gray-500">
              ITEM
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
