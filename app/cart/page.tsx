"use client";

import CartItem from "@/components/cart/CartItem";
import Button from "@/components/ui/Button";
import { useSession } from "@/lib/auth-client";
import { CartItemResponse } from "@/model/CarItemType";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Cart() {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<CartItemResponse>();
  const [isloadingCartData, setLoadingCartData] = useState(false);

  async function getCartItems() {
    try {
      setLoadingCartData(true);

      const response = await fetch("/api/cart");
      if (!response.ok) {
        console.error("Erreur lors de la récupération des données du panier.");
      }

      const data = await response.json();
      console.log(data);
      setCartData(data);
    } catch (error) {
      console.error("Erreur : ", error);
    } finally {
      setLoadingCartData(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (isloadingCartData || !cartData) return <div>Chargement ...</div>;

  return (
    <div className="flex justify-between h-screen px-52 py-18">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold">Panier</h1>
        {cartData.cartItems.length > 0 ? (
          cartData.cartItems.map((item) => (
            <CartItem key={item.id} cartItemData={item} />
          ))
        ) : (
          <p>Il n&apos;y a aucun article dans ton panier.</p>
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
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col gap-8 w-2/6">
        <h2 className="text-xl font-semibold">Récapitulatif</h2>

        {cartData.itemCount > 0 ? (
          <div className="flex flex-col gap-4">
            {cartData.cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <p>{item.product.name}</p>
                <p>{item.priceAtTime}</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-4">
          <div className="flex justify-between">
            <p>Sous-total</p>
            {cartData.itemCount > 0 ? cartData.total : <p>---</p>}
          </div>

          <div className="flex justify-between">
            <p>Frais estimes de prise en charge et d&apos;expédition.</p>
            <p>Gratuit</p>
          </div>
        </div>

        <div className="flex justify-between py-4 border-t border-b font-semibold">
          <p>Total</p>
          {cartData.itemCount > 0 ? cartData.total : <p>---</p>}
        </div>

        <Button>Paiement</Button>
      </div>
    </div>
  );
}
