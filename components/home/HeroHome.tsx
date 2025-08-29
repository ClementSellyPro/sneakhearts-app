import Image from "next/image";

export default function HeroHome() {
  return (
    <div className="relative w-full h-[calc(100vh-4rem)] overflow-hidden">
      <Image
        src="/video/background.jpg"
        alt="Background image"
        width={1810}
        height={1010}
        className="absolute inset-0 w-full h-full object-cover"
        loading="eager"
      />

      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover brightness-80"
      >
        <source src="/video/background.webm" type="video/webm" />
        <source src="/video/background.mp4" type="video/mp4" />
      </video>

      <div className="absolute left-14 bottom-[20%] z-10 text-white">
        <p className="text-8xl font-bold">Sneakhearts</p>
        <p className="text-xl">Chosis ton style. Choisis Sneakhearts.</p>
      </div>
    </div>
  );
}
