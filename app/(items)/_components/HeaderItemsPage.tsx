"use client";

import { useState } from "react";
import Filter from "./Filter";
import Image from "next/image";
import { useProducts } from "@/hooks/UseProducts";

export default function HeaderItemsPage() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { currentCategory, getFilteredProducts } = useProducts();

  const filteredProducts = getFilteredProducts();

  function onToggleFilter() {
    setIsFilterOpen((prev) => !prev);
  }
  return (
    <div className="flex justify-between items-end py-4 border-b border-[#e7e7e7]">
      <h1>
        <span className="text-2xl font-semibold">
          {currentCategory === "Shoes" ? "CHAUSSURE" : "VETEMENT"}
        </span>{" "}
        ({filteredProducts.length})
      </h1>
      <button
        onClick={onToggleFilter}
        className="flex gap-2 px-4 py-2 border cursor-pointer hover:bg-gray-100"
      >
        <span>Filtrer et trier</span>
        <Image
          src={"/icon/arrow_down.svg"}
          alt="Fleche trier"
          width={20}
          height={20}
        />
      </button>
      {isFilterOpen && <Filter setIsOpen={setIsFilterOpen} />}
    </div>
  );
}
