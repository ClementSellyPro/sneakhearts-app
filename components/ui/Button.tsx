export default function Button({ children }: { children: string }) {
  return (
    <button className="px-8 py-2 rounded-full text-lg bg-black text-white hover:brightness-80 cursor-pointer">
      {children}
    </button>
  );
}
