import Image from "next/image";
import { User, Heart, ShoppingCart } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between px-12 bg-white w-full">
      <Image
        src="/logo/logo_sneakhearts.svg"
        width={60}
        height={60}
        alt="Logo"
        priority
        className="cursor-pointer"
      />
      <nav>
        <ul className="flex gap-12 text-xl font-medium">
          <li className="nav-item relative">
            Nouveauté
            <div className="w-2 h-2 rounded-full bg-red-600 absolute -right-4 top-3"></div>
          </li>
          <li className="nav-item">Chaussures</li>
          <li className="nav-item">Vêtements</li>
        </ul>
      </nav>
      <div className="flex items-center gap-4">
        <User className="icon-item" />
        <Heart className="icon-item" />
        <ShoppingCart className="icon-item" />
      </div>
    </header>
  );
};

export default Header;
