import Image from "next/image";

export default function ItemCard() {
  return (
    <div className="group w-fit pb-8 cursor-pointer">
      <div className="border border-gray-300 group-hover:rounded-lg overflow-hidden transition-all">
        <Image
          src={"/sneakers/nike_red_yellow.jpg"}
          alt="Sneakers Photo"
          width={340}
          height={340}
          className="group-hover:scale-120 transition-all duration-500"
        />
      </div>
      <div className="py-2">
        <p className="text-sm text-gray-400">Chaussure Homme</p>
        <div className="flex justify-between text-sm font-semibold">
          <p>Adidas NMD R1</p>
          <p>129,99$</p>
        </div>
      </div>
    </div>
  );
}
