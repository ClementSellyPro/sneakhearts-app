import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="flex justify-between h-screen px-52 py-18">
      <div className="flex flex-col gap-12 w-7/12">
        <h1 className="text-3xl font-semibold text-center">VOTRE PANIER:</h1>
        <div className="flex flex-col gap-4">
          <p>Il n&apos;y a aucun article dans ton panier.</p>

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

      <div className="flex flex-col gap-8 w-4/12">
        <h2 className="text-xl font-semibold">Récapitulatif</h2>

        <div className="flex flex-col gap-4 pt-4 border-t">
          <div className="flex justify-between">
            <p>Sous-total</p>
            <p>---</p>
          </div>

          <div className="flex justify-between">
            <p>Frais estimes de prise en charge et d&apos;expédition.</p>
            <p>Gratuit</p>
          </div>
        </div>

        <div className="flex justify-between text-xl py-4 border-t border-b font-semibold">
          <p>Total</p>
          <p>---</p>
        </div>
      </div>
    </div>
  );
}
