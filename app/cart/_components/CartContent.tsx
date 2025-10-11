"use client";

import CartItem from "./CartItem";
import Button from "@/components/ui/Button";
import { CartItemResponse } from "@/model/CarItemType";
import { useState, useEffect, useTransition } from "react";
import { deleteCartItemAction } from "../action";

interface CartContentProps {
  cartListData: CartItemResponse;
}

export default function CartContent({ cartListData }: CartContentProps) {
  const [cartData, setCartData] = useState<CartItemResponse>();
  //eslint-disable-next-line
  const [isPending, startTransition] = useTransition();

  function handleDelete(cartItemId: string) {
    setCartData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cartItems: prev.cartItems.filter((item) => item.id !== cartItemId),
        itemCount: prev.itemCount,
        total:
          prev.total -
          (prev.cartItems.find((i) => i.id === cartItemId)?.subtotal ?? 0),
      };
    });

    startTransition(async () => {
      try {
        await deleteCartItemAction(cartItemId);
      } catch (error) {
        console.error("Error:", error);
        alert("Erreur lors de la suppression");
      }
    });
  }

  useEffect(() => {
    setCartData(cartListData);
    //eslint-disable-next-line
  }, []);

  if (!cartData) return <div>Chargement...</div>;

  return (
    <div className="flex justify-between min-h-screen px-52 py-18">
      <div className="flex flex-col gap-12 w-7/12">
        <h1 className="text-3xl font-semibold text-center">VOTRE PANIER:</h1>
        <div className="flex flex-col gap-4">
          {cartData.cartItems.length > 0 ? (
            cartData.cartItems.map((item) => (
              <CartItem
                onDeleteCartItem={handleDelete}
                key={item.id}
                cartItemData={item}
              />
            ))
          ) : (
            <p>Il n&apos;y a aucun article dans ton panier.</p>
          )}
        </div>
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
