import Image from "next/image";
import { useState } from "react";

interface filterSectionProps {
  title: string;
  items: string[];
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
        <div>
          {items.map((item, index) => {
            return (
              <p
                key={index}
                className="px-6 py-4 border-b border-b-gray-300 cursor-pointer hover:bg-gray-100"
              >
                {item}
              </p>
            );
          })}
        </div>
      )}
    </>
  );
}
