import Image from "next/image";
import { Dispatch, SetStateAction } from "react";
import FilterSection from "./FilterSection";

interface filterProps {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Filter({ setIsOpen }: filterProps) {
  function toggleOpenFilter() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div onClick={toggleOpenFilter} className="fixed inset-0 bg-black/25">
      <div
        className="fixed top-0 right-0 w-2/6"
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
            items={["Prix (croissant)", "Prix (décroissant)", "Nouveauté"]}
          />
          <FilterSection title="Sexe" items={["Femme", "Homme"]} />
          <FilterSection title="Catégorie" items={["Chaussure", "Vêtement"]} />
        </div>
      </div>
    </div>
  );
}
