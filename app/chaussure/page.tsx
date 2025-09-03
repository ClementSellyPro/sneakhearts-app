"use client";

import { useState } from "react";
import Filter from "@/components/items-page/Filter";

export default function Chaussure() {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  function onToggleFilter() {
    setIsFilterOpen((prev) => !prev);
  }

  return (
    <div className="px-12 py-4 bg-[#f7f7f7]">
      <div className="flex justify-between items-end py-4 border-b border-[#e7e7e7]">
        <h1>
          <span className="text-2xl font-semibold">CHAUSSURE</span> (12)
        </h1>
        <button
          onClick={onToggleFilter}
          className="px-4 py-2 bg-[#f7f7f7] border cursor-pointer hover:bg-gray-200"
        >
          Filtrer et trier
        </button>
        {isFilterOpen && <Filter setIsOpen={setIsFilterOpen} />}
      </div>
    </div>
  );
}
