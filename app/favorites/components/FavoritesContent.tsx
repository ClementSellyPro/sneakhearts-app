"use client";

import FavoriteCard from "./FavoriteCard";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { Favorite } from "@/model/FavoriteType";
import { useSession } from "@/lib/auth-client";
import deleteFavoriteItemAction from "../action";
import ModalConfirmation from "@/components/shared/ModalConfirmation";

interface favoritesContentProps {
  favoritesListData: Favorite[];
}

export default function FavoritesContent({
  favoritesListData,
}: favoritesContentProps) {
  const { data: session } = useSession();
  const [favoritesData, setFavoritesData] = useState<Favorite[]>([]);
  //eslint-disable-next-line
  const [isPending, startTransition] = useTransition();
  const [isAddingConfirmation, setIsAddingConfirmation] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  useEffect(() => {
    setFavoritesData(favoritesListData);
    //eslint-disable-next-line
  }, []);

  function handleDelete(favoriteItemId: string) {
    setIsAddingConfirmation(true);
    setIdToDelete(favoriteItemId);
  }

  function confirmDeleting() {
    setFavoritesData((prev) => {
      if (!prev) return prev;
      return [...prev.filter((item) => item.id !== idToDelete)];
    });

    startTransition(async () => {
      try {
        deleteFavoriteItemAction(idToDelete);
      } catch (error) {
        console.error("Error:", error);
        alert("Erreur lors de la suppression");
      } finally {
        setIsAddingConfirmation(false);
        setIdToDelete("");
      }
    });
  }

  return (
    <div className="flex justify-between h-screen px-52 py-18">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Articles Favoris</h1>

        <div className="grid grid-cols-3 gap-4">
          {favoritesData.length > 0 ? (
            favoritesData.map((fav) => (
              <FavoriteCard
                productId={fav.id}
                onDeleteFavItem={handleDelete}
                favorite={fav.product}
                key={fav.product.id}
              />
            ))
          ) : (
            <p>
              Il n&apos;y a aucun article ajouté comme favori pour le moment.
            </p>
          )}
        </div>

        {isAddingConfirmation && (
          <ModalConfirmation
            confirmDeleting={confirmDeleting}
            setIsAddingConfirmation={setIsAddingConfirmation}
          />
        )}

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
