import Link from "next/link";

export default function EmptyFavorites() {
  return (
    <div className="flex justify-between h-screen px-52 py-18">
      <div className="flex flex-col gap-8">
        <h1 className="text-3xl font-semibold">VOS ARTICLES FAVORIS:</h1>

        <p>Il n&apos;y a aucun article ajouté comme favori pour le moment.</p>

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
      </div>
    </div>
  );
}
