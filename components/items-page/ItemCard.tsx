import Image from "next/image";
import ItemMiniatureVariation from "./ItemMiniatureVariations";

export default function ItemCard() {
  return (
    <div className="group w-fit pb-8 cursor-pointer relative">
      <div className="border border-gray-300 group-hover:rounded-lg overflow-hidden transition-all">
        <Image
          src={"/sneakers/nike_red_yellow.jpg"}
          alt="Sneakers Photo"
          width={340}
          height={340}
          className="group-hover:scale-120 transition-all duration-500"
        />
      </div>
      <div className="flex flex-col gap-2 pt-4 group-hover:pt-1 group-hover:absolute bottom-2 group-hover:z-20 bg-white w-full">
        <p className="text-sm text-gray-400 group-hover:hidden">
          Chaussure Homme
        </p>
        <div className="hidden group-hover:block">
          <ItemMiniatureVariation />
        </div>
        <div className="flex justify-between font-semibold">
          <p>Adidas NMD R1</p>
          <p>129,99$</p>
        </div>
      </div>
    </div>
  );
}
