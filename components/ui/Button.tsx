interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
}

export default function Button({ children }: ButtonProps) {
  return (
    <button className="px-8 py-2 rounded-full text-lg bg-black text-white hover:brightness-80 cursor-pointer">
      {children}
    </button>
  );
}
