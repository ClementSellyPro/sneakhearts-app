"use client";

import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import FilterSection from "./FilterSection";
import { useProductStore } from "@/store/productStore";

interface filterProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Filter({ setIsOpen }: filterProps) {
  const { filters, setSortBy, setGenderFilter } = useProductStore();

  function toggleOpenFilter() {
    setIsOpen((prev) => !prev);
  }

  function toggleSortBy(filter: string) {
    if (filter === "price-asc") {
      setSortBy("price-asc");
    } else if (filter === "price-desc") {
      setSortBy("price-desc");
    } else {
      setSortBy("promotion");
    }
  }

  function toggleGender(gender: string) {
    const currentGenders = [...filters.genders];

    if (currentGenders.includes(gender)) {
      setGenderFilter(
        currentGenders.filter((currentGender) => currentGender !== gender)
      );
    } else {
      setGenderFilter([...currentGenders, gender]);
    }
  }

  return (
    <div onClick={toggleOpenFilter} className="fixed inset-0 bg-black/25 z-20">
      <div
        className="fixed top-0 right-0 w-8/12 md:w-3/12"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative top-0 h-screen bg-white">
          <div className="flex justify-between px-6 py-4 border-b border-b-gray-300">
            <h3 className="font-semibold text-2xl">Filtrer et Trier</h3>
            <Image
              src={"/icon/cross.svg"}
              alt="Fermer"
              width={20}
              height={20}
              className="cursor-pointer"
              onClick={toggleOpenFilter}
            />
          </div>

          <FilterSection
            title="Trier par"
            items={[
              {
                filterName: "Prix (croissant)",
                isSelected: filters.sortBy === "price-asc",
              },
              {
                filterName: "Prix (décroissant)",
                isSelected: filters.sortBy === "price-desc",
              },
              {
                filterName: "Promotion",
                isSelected: filters.sortBy === "promotion",
              },
            ]}
            toggleFilter={toggleSortBy}
          />
          <FilterSection
            title="Genre"
            items={[
              {
                filterName: "Homme",
                isSelected: filters.genders.includes("male"),
              },
              {
                filterName: "Femme",
                isSelected: filters.genders.includes("female"),
              },
              {
                filterName: "Mixte",
                isSelected: filters.genders.includes("mixte"),
              },
            ]}
            toggleFilter={toggleGender}
          />
        </div>
      </div>
    </div>
  );
}
