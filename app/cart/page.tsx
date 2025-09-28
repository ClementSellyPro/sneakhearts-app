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
      <div className="flex flex-col gap-12 w-7/12">
        <h1 className="text-3xl font-semibold text-center">VOTRE PANIER:</h1>
        <div className="flex flex-col gap-4">
          {cartData.cartItems.length > 0 ? (
            cartData.cartItems.map((item) => (
              <CartItem key={item.id} cartItemData={item} />
            ))
          ) : (
            <p>Il n&apos;y a aucun article dans ton panier.</p>
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
        ) : (
          ""
        )}
      </div>

      <div className="flex flex-col gap-8 w-4/12">
        <h2 className="text-xl font-semibold">Récapitulatif</h2>

        {cartData.itemCount > 0 ? (
          <div className="flex flex-col gap-4">
            {cartData.cartItems.map((item) => (
              <div key={item.id} className="flex justify-between">
                <p className="flex-1">
                  - {item.product.name}
                  <span className="text-sm font-semibold">
                    {" "}
                    x {item.quantity}
                  </span>
                </p>
                <p>{item.currentPrice}$</p>
              </div>
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-4 pt-4 border-t">
          <div className="flex justify-between">
            <p>Sous-total</p>
            {cartData.itemCount > 0 ? (
              cartData.total.toFixed(2) + "$"
            ) : (
              <p>---</p>
            )}
          </div>

          <div className="flex justify-between">
            <p>Frais estimes de prise en charge et d&apos;expédition.</p>
            <p>Gratuit</p>
          </div>
        </div>

        <div className="flex justify-between text-xl py-4 border-t border-b font-semibold">
          <p>Total</p>
          <p>
            {cartData.itemCount > 0 ? cartData.total.toFixed(2) + "$" : "---"}
          </p>
        </div>

        <Button>Paiement</Button>
      </div>
    </div>
  );
}
