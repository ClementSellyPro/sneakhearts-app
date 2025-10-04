interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  onClick?: (
    event: React.MouseEvent<HTMLButtonElement>
  ) => void | Promise<void>;
  secondary?: boolean;
}

export default function Button({
  type,
  secondary,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-8 py-2 rounded-full text-lg ${
        secondary
          ? "border border-black hover:bg-black/15"
          : "bg-black text-white"
      }  hover:brightness-80 cursor-pointer`}
    >
      {children}
    </button>
  );
}
