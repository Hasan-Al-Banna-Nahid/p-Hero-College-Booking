import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  return (
    <div className="container mt-20 mx-auto p-4  flex justify-center">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search for a college...By Name"
        className="w-full max-w-lg p-3 pl-4 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 shadow-md"
      />
    </div>
  );
};

export default SearchBar;
