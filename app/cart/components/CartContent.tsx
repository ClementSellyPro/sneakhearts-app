"use client";

import CartItem from "@/components/cart/CartItem";
import Button from "@/components/ui/Button";
import { useSession } from "@/lib/auth-client";
import { CartItemResponse } from "@/model/CarItemType";
import Link from "next/link";
import { useState, useEffect } from "react";

interface CartContentProps {
  cartListData: CartItemResponse;
}

export default function CartContent({ cartListData }: CartContentProps) {
  const { data: session } = useSession();
  const [cartData, setCartData] = useState<CartItemResponse>();

  useEffect(() => {
    setCartData(cartListData);
    //eslint-disable-next-line
  }, []);

  async function onDeleteCartItem(cartItemId: string) {
    try {
      const response = await fetch("/api/cart", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cartItemId: cartItemId }),
      });

      if (!response.ok) {
        alert("Erreur lors de la suppression de l'article.");
        return;
      } else {
        alert("Suppression reussi");
      }
    } catch (error) {
      console.error("Erreur: ", error);
    }
  }

  if (!cartData) return <div>Chargement...</div>;

  return (
    <div className="flex justify-between min-h-screen px-52 py-18">
      <div className="flex flex-col gap-12 w-7/12">
        <h1 className="text-3xl font-semibold text-center">VOTRE PANIER:</h1>
        <div className="flex flex-col gap-4">
          {cartData.cartItems.length > 0 ? (
            cartData.cartItems.map((item) => (
              <CartItem
                onDeleteCartItem={onDeleteCartItem}
                key={item.id}
                cartItemData={item}
              />
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
