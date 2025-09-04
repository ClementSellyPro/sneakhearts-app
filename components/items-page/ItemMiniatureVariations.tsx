import Image from "next/image";

export default function ItemMiniatureVariation() {
  return (
    <div className="flex gap-2">
      <Image
        src={"/sneakers/nike_red_yellow.jpg"}
        alt="Variations"
        width={50}
        height={50}
        className="rounded-md"
      />
      <Image
        src={"/sneakers/nike_red_yellow.jpg"}
        alt="Variations"
        width={50}
        height={50}
        className="rounded-md"
      />
      <Image
        src={"/sneakers/nike_red_yellow.jpg"}
        alt="Variations"
        width={50}
        height={50}
        className="rounded-md"
      />
    </div>
  );
}
