export default function Loading() {
  return (
    <div className="flex flex-col md:flex-row justify-baseline md:justify-between gap-18 h-screen px-6 md:px-24 lg:px-48 py-12 md:py-18 w-full">
      <div className="flex flex-col gap-12 w-full md:w-7/12">
        <h1 className="text-3xl font-semibold text-center">VOTRE PANIER:</h1>
        <div className="flex flex-col gap-4 h-20 border rounded-xl"></div>
      </div>

      <div className="flex flex-col gap-8 w-full md:w-4/12">
        <h2 className="text-xl font-semibold">Récapitulatif</h2>

        <div className="flex flex-col gap-4 pt-4 border-t">
          <div className="flex justify-between">
            <p>Sous-total</p>
            <p>---</p>
          </div>

          <div className="flex justify-between">
            <p>Frais estimes de prise en charge et d&apos;expédition.</p>
            <p>Gratuit</p>
          </div>
        </div>

        <div className="flex justify-between text-xl py-4 border-t border-b font-semibold">
          <p>Total</p>
          <p>---</p>
        </div>
      </div>
    </div>
  );
}
