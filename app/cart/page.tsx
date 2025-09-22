"use client";

import Button from "@/components/ui/Button";
import { useSession } from "@/lib/auth-client";
import Link from "next/link";

export default function Cart() {
  const { data: session } = useSession();

  return (
    <div className="flex justify-between h-screen px-52 py-18">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Panier</h1>
        <p>Il n&apos;y a aucun article dans ton panier.</p>

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
          <p>Liste des produits</p>
        )}
      </div>

      <div className="flex flex-col gap-8 w-2/6">
        <h2 className="text-xl font-semibold">Récapitulatif</h2>

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Sous-total</p>
            <p>---</p>
          </div>

          <div className="flex justify-between">
            <p>Frais estimes de prise en charge et d&apos;expédition.</p>
            <p>Gratuit</p>
          </div>
        </div>

        <div className="flex justify-between py-4 border-t border-b">
          <p className="font-semibold">Total</p>
          <p>---</p>
        </div>

        <Button>Paiement</Button>
      </div>
    </div>
  );
}
