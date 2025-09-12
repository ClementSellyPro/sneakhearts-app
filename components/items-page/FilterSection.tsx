import Image from "next/image";
import { useState } from "react";

interface filterSectionProps {
  title: string;
  items: {
    filterName: string;
    isSelected: boolean;
  }[];
}

export default function FilterSection({ title, items }: filterSectionProps) {
  const [isSectionOpen, setIsSectionOpen] = useState<boolean>(false);

  function toggleSection() {
    setIsSectionOpen((prev) => !prev);
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
                    item.isSelected ? "border-l-8" : null
                  }`}
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
