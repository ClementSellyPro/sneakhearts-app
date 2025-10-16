import Image from "next/image";
import Button from "../ui/Button";
import Link from "next/link";

export default function Highlight() {
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between h-screen w-full text-white">
      <div className="flex justify-center items-center h-1/2 md:h-screen w-1/2 overflow-hidden">
        <Image
          src={"/sneakers/nike_classic_two.jpg"}
          alt="Sneakers"
          width={453}
          height={800}
          className="object-cover"
        />
        <Image
          src={"/logo/logo_sneakhearts_simple.svg"}
          alt="Logo sneakhearts"
          width={38}
          height={134}
          className="absolute top-6 md:top-auto md:bottom-6 left-8 z-10 w-6 md:w-9"
        />
      </div>
      <div className="relative p-6 md:p-12 h-1/2 md:h-screen w-full md:w-1/2 bg-[#C5B18D]">
        <h2 className="text-3xl md:text-6xl font-semibold">La Classique</h2>
        <div className="absolute flex flex-col items-start gap-8 bottom-12 text-2xl md:text-4xl w-5/6">
          <div>
            <p>
              Vous êtes à la recherche d&apos;une classique pour tous les jours
              ?
            </p>
            <p className="mb-10">Décourvrez notre sélection.</p>
          </div>

          <Link href={"/chaussures"}>
            <Button>Découvrir</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
