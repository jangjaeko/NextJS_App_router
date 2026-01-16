import { useState } from "react";

export default function SearchBar() {
  const [search, setSearch] = useState("");
  const onChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };
  return (
    <div>
      <input value={search} onChange={onChangeSearch} />
      <button>Search</button>
    </div>
  );
}
