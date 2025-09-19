import Image from "next/image";
import { useState } from "react";

interface filterSectionProps {
  title: string;
  items: {
    filterName: string;
    isSelected: boolean;
  }[];
  toggleFilter: (sortBy: string) => void;
}

export default function FilterSection({
  title,
  items,
  toggleFilter,
}: filterSectionProps) {
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(false);

  function toggleSection() {
    setIsSectionOpen((prev) => !prev);
  }

  function getFilterValue(displayName: string, sectionTitle: string): string {
    if (sectionTitle === "Trier par") {
      switch (displayName) {
        case "Prix (croissant)":
          return "price-asc";
        case "Prix (décroissant)":
          return "price-desc";
        case "Promotion":
          return "promotion";
        default:
          return displayName;
      }
    } else if (sectionTitle === "Genre") {
      switch (displayName) {
        case "Homme":
          return "male";
        case "Femme":
          return "female";
        case "Mixte":
          return "mixte";
        default:
          return displayName;
      }
    }
    return displayName;
  }

  return (
    <>
      <div
        className="flex justify-between px-6 py-4 border-b border-b-gray-300 cursor-pointer"
        onClick={toggleSection}
      >
        <h4 className="text-lg font-semibold">{title}</h4>
        <Image
          src={"/icon/arrow_down.svg"}
          alt="Fleche"
          width={20}
          height={20}
        />
      </div>
      {isSectionOpen && (
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-full">
            {items.map((item, index) => {
              return (
                <div
                  key={index}
                  className={`flex gap-4 px-6 py-4 border-b border-b-gray-300 hover:bg-gray-100 cursor-pointer ${
                    item.isSelected ? "border-l-8 font-semibold" : null
                  }`}
                  onClick={() =>
                    toggleFilter(getFilterValue(item.filterName, title))
                  }
                >
                  <p>-</p>
                  <p>{item.filterName}</p>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
