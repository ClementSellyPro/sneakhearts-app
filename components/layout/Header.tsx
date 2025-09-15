import Image from "next/image";
import { User, Heart, ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-12 bg-white w-full border-b border-gray-200">
      <Link href={"/"}>
        <Image
          src="/logo/logo_sneakhearts.svg"
          width={60}
          height={60}
          alt="Logo"
          priority
          className="cursor-pointer"
        />
      </Link>
      <nav>
        <ul className="flex gap-12 text-xl font-medium">
          <Link href={"/chaussures"}>
            <li className="nav-item">Chaussures</li>
          </Link>
          <Link href={"/vetements"}>
            <li className="nav-item">Vêtements</li>
          </Link>
          <li className="flex gap-2 items-center cursor-default">
            <span className="opacity-75">Accessoires</span>
            <span className="font-light text-xs w-fit text-red-500">
              Arrive bientôt
            </span>
          </li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <Link href={"/register"}>
          <User className="icon-item" />
        </Link>

        <Heart className="icon-item" />
        <Link href={"/cart"}>
          <ShoppingCart className="icon-item" />
        </Link>
      </div>
    </header>
  );
}
