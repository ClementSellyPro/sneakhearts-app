import Image from "next/image";
import Button from "../ui/Button";

export default function Highlight() {
  return (
    <div className="relative flex items-center justify-between h-screen w-full text-white">
      <div className="flex justify-center items-center h-screen w-1/2">
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
          className="absolute bottom-6 left-8 z-10"
        />
      </div>
      <div className="relative p-12 h-screen w-1/2 bg-[#C5B18D]">
        <h2 className="text-6xl font-semibold">La Classique</h2>
        <div className="absolute flex flex-col items-start gap-8 bottom-12 text-4xl w-5/6">
          <div>
            <p>
              Vous êtes à la recherche d&apos;une classique pour tous les jours
              ?
            </p>
            <p className="mb-10">Décourvrez notre sélection.</p>
          </div>

          <Button>Découvrir</Button>
        </div>
      </div>
    </div>
  );
}
