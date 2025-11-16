import { useState } from "react";

function InputButton() {
  const [search, setSearch] = useState<string>("");

  function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setSearch(e.target.value);
  }
  return (
    <input
      onChange={handleSearchChange}
      value={search}
      placeholder="Search Destinations..."
      className="bg-primary-blue-50 border-secondary-blue col-start-2 rounded-4xl border-2 px-6 py-2 text-center text-lg outline-0"
    />
  );
}

export default InputButton;
