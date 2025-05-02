import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSortBy } from "../../context/features/sortSlice";

const Select = () => {
  const dispatch = useDispatch();
  const sortBy = useSelector((state) => state.sort.sortBy);

  const handleSortChange = (e) => {
    dispatch(setSortBy(e.target.value));
  };

  return (
    <div class="w-full max-w-[300px]">
      <div class="relative">
        <select
          value={sortBy}
          onChange={handleSortChange}
          class="w-full p bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded pl-3 pr-8 py-3 transition duration-300 ease focus:outline-none focus:border-slate-400  shadow-sm appearance-none cursor-pointer"
        >
          <option value="asc">Order By Asc </option>
          <option value="desc">Order By Desc </option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-chevron-down  ml-1 absolute top-4 right-2.5 text-slate-700"
          viewBox="0 0 16 16"
        >
          <path
            fill-rule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
          />
        </svg>
      </div>
    </div>
  );
};

export default Select;
