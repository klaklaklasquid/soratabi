import { useState } from "react";

function InputButton({ type, placeholder, min, max }: InputButtonProps) {
  const [search, setSearch] = useState<string>("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <input
      type={type ? type : ""}
      min={min}
      max={max}
      onChange={handleSearchChange}
      value={search}
      placeholder={placeholder}
      className="bg-primary-blue-50 border-secondary-blue col-start-2 grow-5 rounded-4xl border-2 px-6 py-2 text-center text-lg outline-0"
    />
  );
}

interface InputButtonProps {
  placeholder?: string;
  type?: string;
  min?: number;
  max?: number;
}

export default InputButton;
