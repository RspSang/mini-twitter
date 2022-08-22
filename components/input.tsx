import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps {
  name: string;
  type: string;
  register: UseFormRegisterReturn;
  placeholder?: string;
  required?: boolean;
}

export default function Input({
  name,
  register,
  placeholder,
  type,
  required = false,
}: InputProps) {
  return (
    <input
      id={name}
      required={required}
      placeholder={placeholder}
      {...register}
      type={type}
      className="border-2 border-[#188CD8] w-full rounded-full py-2 px-4"
    />
  );
}
