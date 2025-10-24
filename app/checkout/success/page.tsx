import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex flex-col justify-center items-center gap-12 py-24">
      <Image src={"/icon/achat.png"} alt="Achat" width={220} height={220} />
      <div className="flex flex-col items-center gap-8 text-center">
        <p className="text-3xl">
          Merci d&apos;avoir choisi Sneakearts pour vos achats !
        </p>
        <p className="text-2xl font-bold">Que souhaitez-vous ?</p>

        <div className="flex gap-8">
          <Link href={"/Chaussure"}>
            <Button secondary>Naviguer les produits</Button>
          </Link>
          <Link href={"/cart"}>
            <Button>Historique de commande</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
