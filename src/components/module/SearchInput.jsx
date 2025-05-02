import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../context/features/searchSlice";

const SearchInput = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state.search.query);

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };
  return (
    <div className="relative w-full">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        fill="currentColor"
        class="bi bi-search absolute left-4 top-4 text-slate-700"
        viewBox="0 0 16 16"
      >
        <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
      </svg>
      <input
        onChange={handleSearch}
        value={query}
        type="text"
        placeholder="Search..."
        className="outline-none w-full shadow-sm border border-slate-300 placeholder:text-slate-700 h-full pl-10 rounded-sm"
      />
    </div>
  );
};

export default SearchInput;
