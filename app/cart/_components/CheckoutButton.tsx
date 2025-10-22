"use client";

import { useState } from "react";

export default function CheckoutButton() {
  const [isLoading, setIsLoading] = useState(false);

  async function handleCheckout() {
    setIsLoading(true);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Erreur pour créer un session checkout");
      }
    } catch (error) {
      console.error("Erreur :", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <button
      onClick={handleCheckout}
      className="px-8 py-2 rounded-full text-lg
    bg-black text-white
      hover:brightness-80 cursor-pointer"
    >
      {isLoading ? "Chargement..." : "Paiement"}
    </button>
  );
}
