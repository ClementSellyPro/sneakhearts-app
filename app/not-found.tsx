import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 py-24">
      <Image src={"/icon/lost.png"} alt="Achat" width={220} height={220} />
      <div className="flex flex-col items-center gap-8 text-center">
        <p className="text-3xl">Cette page n&apos;existe pas !</p>

        <div className="flex gap-8">
          <Link href={"/Chaussure"}>
            <Button secondary>Naviguer vers les produits</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
