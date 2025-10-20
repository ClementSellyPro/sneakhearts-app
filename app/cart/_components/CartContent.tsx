"use client";

import CartItem from "./CartItem";
import Button from "@/components/ui/Button";
import { CartItemResponse } from "@/model/CarItemType";
import { useState, useEffect, useTransition } from "react";
import { deleteCartItemAction } from "../action";
import ModalConfirmation from "@/components/shared/ModalConfirmation";
import Loading from "../loading";

interface CartContentProps {
  cartListData: CartItemResponse;
}

export default function CartContent({ cartListData }: CartContentProps) {
  const [cartData, setCartData] = useState<CartItemResponse>();
  //eslint-disable-next-line
  const [isPending, startTransition] = useTransition();
  const [isDeleting, setIsDeleting] = useState(false);
  const [idToDelete, setIdToDelete] = useState("");

  function handleDelete(id: string) {
    setIsDeleting(true);
    setIdToDelete(id);
  }

  function confirmDeleting() {
    setCartData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        cartItems: prev.cartItems.filter((item) => item.id !== idToDelete),
        itemCount: prev.itemCount,
        total:
          prev.total -
          (prev.cartItems.find((i) => i.id === idToDelete)?.subtotal ?? 0),
      };
    });

    startTransition(async () => {
      try {
        await deleteCartItemAction(idToDelete);
      } catch (error) {
        console.error("Error:", error);
        alert("Erreur lors de la suppression");
      } finally {
        setIsDeleting(false);
        setIdToDelete("");
      }
    });
  }

  useEffect(() => {
    setCartData(cartListData);
    //eslint-disable-next-line
  }, []);

  if (!cartData)
    return (
      <div>
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col md:flex-row justify-between gap-18 min-h-screen px-6 md:px-24 lg:px-48 py-12 md:py-18 w-full">
      <div className="flex flex-col gap-12 w-full md:w-7/12">
        <h1 className="text-3xl font-semibold text-center">VOTRE PANIER:</h1>
        <div className="flex flex-col gap-4">
          {cartData.cartItems.length > 0 ? (
            cartData.cartItems.map((item) => (
              <CartItem
                onDeleteCartItem={() => handleDelete(item.id)}
                key={item.id}
                cartItemData={item}
              />
            ))
          ) : (
            <p>Il n&apos;y a aucun article dans ton panier.</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-8 w-full md:w-4/12">
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

      {isDeleting && (
        <ModalConfirmation
          message="Etes-vous sûr de vouloir retirer ce produit de votre panier ?"
          onConfirmation={confirmDeleting}
          setAction={setIsDeleting}
        />
      )}
    </div>
  );
}
