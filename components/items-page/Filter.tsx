import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import FilterSection from "./FilterSection";
import Button from "../ui/Button";

interface filterProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Filter({ setIsOpen }: filterProps) {
  function toggleOpenFilter() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div onClick={toggleOpenFilter} className="fixed inset-0 bg-black/25 z-20">
      <div
        className="fixed top-0 right-0 w-3/12"
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
              { filterName: "Prix (croissant)", isSelected: true },
              { filterName: "Prix (décroissant)", isSelected: false },
              { filterName: "Promotion", isSelected: false },
            ]}
          />
          <FilterSection
            title="Sexe"
            items={[
              { filterName: "Homme", isSelected: true },
              { filterName: "Femme", isSelected: false },
            ]}
          />
          <FilterSection
            title="Catégorie"
            items={[
              { filterName: "Chaussure", isSelected: true },
              { filterName: "Vêtement", isSelected: false },
            ]}
          />
          <div className="flex justify-center pt-8">
            <Button className="w-full" type="button">
              Appliquer
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
