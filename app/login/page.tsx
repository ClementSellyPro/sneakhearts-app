import Image from "next/image";

export default function Login() {
  return (
    <div className="flex flex-col items-center gap-4 p-4 h-full">
      <Image
        src={"/logo/logo_sneakhearts_full.svg"}
        width={244}
        height={67}
        alt="Sneakhearts logo"
      />

      <div className="flex flex-col gap-8 pt-36 w-[500px]">
        <div className=" flex flex-col items-center w-full text-3xl">
          <p>Saisis ton adresse e-mail</p>
          <p>pour créer un compte ou te connecter</p>
        </div>
        <form className="flex flex-col gap-6">
          <input
            type="text"
            id="mail"
            className="w-full text-2xl h-12 pl-4 border rounded-md outline-none border-gray-400 focus:border-blue-500"
          />
          <div className="flex justify-between text-xs w-full">
            <p className="w-3/5">
              En continuant, j&apos;accepte la{" "}
              <span className="underline">Politique de confidentialité</span> et
              aux{" "}
              <span className="underline">Conditions d&apos;utilisation</span>.
            </p>
            <button className="px-8 py-1.5 rounded-full text-lg bg-black text-white hover:brightness-80 cursor-pointer">
              Continuer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
