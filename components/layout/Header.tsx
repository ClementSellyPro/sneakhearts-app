import Image from "next/image";
import { User, Heart, ShoppingCart, LogOut } from "lucide-react";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";

export default function Header() {
  const { data: session } = useSession();

  function onLogout() {
    authClient.signOut();
  }

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
        {session?.user ? (
          <LogOut className="icon-item" onClick={onLogout} />
        ) : (
          <Link href={"/register"}>
            <User className="icon-item" />
          </Link>
        )}

        <Link href={"/favorites"}>
          <Heart className="icon-item" />
        </Link>
        <Link href={"/cart"}>
          <ShoppingCart className="icon-item" />
        </Link>
      </div>
    </header>
  );
}
