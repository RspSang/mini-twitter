import { cls } from "../lib/client/utils";

interface ButtonProps {
  type?: "fill";
  text: string;
  [key: string]: any;
}

export default function Button({ type, onClick, text, ...rest }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      {...rest}
      className={cls(
        "w-full rounded-full border border-transparent px-4 py-1 font-medium shadow-sm",
        type
          ? "bg-[#188CD8] text-white"
          : "bg-white text-[#188CD8] border-[#188CD8]"
      )}
    >
      {text}
    </button>
  );
}
