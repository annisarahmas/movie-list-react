import React, { useState } from "react";

const Search = ({ search }) => {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchInputChanges = e => {
    setSearchValue(e.target.value);
  };

  const resetInputField = () => {
    setSearchValue("");
  };

  const callSearchFunction = e => {
    e.preventDefault();
    search(searchValue);
    resetInputField();
  };

  return (
    <form className="searchWrapper">
      <input
        value={searchValue}
        onChange={handleSearchInputChanges}
        type="text"
        className="input-search shadow-sm ring-1 ring-inset ring-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-900"
      />

      <input
        className="btn-search px-3 py-2 text-sm font-semibold"
        onClick={callSearchFunction}
        type="submit"
        value="Search"
      />
    </form>
  );
};

export default Search;
