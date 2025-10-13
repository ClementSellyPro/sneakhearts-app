import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-black text-white w-full px-6 md:px-14">
      <div className="flex flex-col md:flex-row items-start justify-between pt-8 pb-4 md:pb-14 w-full">
        <div className="flex flex-wrap md:flex-row gap-8 md:gap-32 pb-8 md:pb-0">
          <div className="footer-group">
            <h2 className="footer-title">PRODUITS</h2>
            <ul className="footer-items">
              <li>Chaussures</li>
              <li>Vêtements</li>
            </ul>
          </div>
          <div className="footer-group">
            <h2 className="footer-title">ENTREPRISE</h2>
            <ul className="footer-items">
              <li>À propos de Sneakhearts</li>
              <li>Votre carrière chez Sneakhearts</li>
            </ul>
          </div>
          <div className="footer-group">
            <h2 className="footer-title">AIDE</h2>
            <ul className="footer-items">
              <li>Suivi commande</li>
              <li>Livraison et retours</li>
              <li>Service client</li>
            </ul>
          </div>
        </div>

        <Image
          src={"/logo/logo_sneakhearts_full_white.svg"}
          width={244}
          height={67}
          alt="Sneakhearts logo"
          style={{ fill: "#fff" }}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-4 justify-between w-full border-t pt-2 pb-8 text-xs">
        <div>2025 Sneakhearts (marque fictif)</div>
        <div>
          <ul className="flex gap-4">
            <li>Condidentialité et cookie</li>
            <li>Conditions générales</li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
