"use client";

import Image from "next/image";
import { User, Heart, ShoppingCart, LogOut } from "lucide-react";
import Link from "next/link";
import { authClient, useSession } from "@/lib/auth-client";
import { useEffect, useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsMobileMenuOpen(false);
    }

    document.addEventListener("scroll", handleScroll);

    return document.removeEventListener("scroll", handleScroll);
  }, []);

  function onLogout() {
    authClient.signOut();
  }

  function toggleMobileMenu() {
    setIsMobileMenuOpen((prev) => !prev);
  }

  return (
    <header className="flex items-center justify-between md:h-20 h-14 md:px-12 px-6 bg-white w-full border-b border-gray-200">
      <Image
        src="/icon/menu.png"
        width={30}
        height={30}
        alt="Menu"
        priority
        className="cursor-pointer block md:hidden"
        onClick={toggleMobileMenu}
      />
      <Link href={"/"}>
        <Image
          src="/logo/logo_sneakhearts.svg"
          width={60}
          height={60}
          alt="Logo"
          priority
          className="cursor-pointer w-10 md:w-14"
        />
      </Link>
      <nav
        className={` ${
          isMobileMenuOpen ? "block" : "hidden"
        } md:block fixed top-14 left-0 md:static w-full md:w-fit py-8 md:py-0 z-50 text-center bg-white transition-all duration-300`}
      >
        <ul className="flex md:flex-row flex-col gap-12 text-xl font-medium">
          <Link href={"/chaussures"}>
            <li className="nav-item">Chaussures</li>
          </Link>
          <Link href={"/vetements"}>
            <li className="nav-item">Vêtements</li>
          </Link>
          <li className="flex gap-2 items-center md:justify-start justify-center cursor-default">
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
