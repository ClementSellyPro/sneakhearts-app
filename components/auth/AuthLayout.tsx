import Link from "next/link";
import Image from "next/image";

interface AuthLayoutProps {
  title: string;
  alternativeAction: {
    text: string;
    linkText: string;
    href: string;
  };
  children: React.ReactNode;
}

export default function AuthLayout({
  title,
  alternativeAction,
  children,
}: AuthLayoutProps) {
  return (
    <div className="flex flex-col items-center gap-4 p-4 h-full">
      <Link href={"/"}>
        <Image
          src={"/logo/logo_sneakhearts_full.svg"}
          width={244}
          height={67}
          alt="Sneakhearts logo"
        />
      </Link>

      <div className="flex flex-col gap-8 pt-36 w-[500px]">
        <div className=" flex flex-col items-center w-full text-3xl">
          <h1>{title}</h1>
        </div>
      </div>

      {children}

      <p className="text-center pt-8">
        {alternativeAction.text}{" "}
        <Link
          className="font-bold text-lg text-amber-500"
          href={alternativeAction.href}
        >
          {alternativeAction.linkText}
        </Link>
      </p>
    </div>
  );
}
