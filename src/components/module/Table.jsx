import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDomains } from "../../context/features/domainSlice";
import DropdownMenu from "./DropdownMenu";

function Table({ columns }) {
  const dispatch = useDispatch();
  const domains = useSelector((state) => state.domains.domains);
  const status = useSelector((state) => state.domains.status);
  const error = useSelector((state) => state.domains.error);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const tableRef = useRef(null);
  const searchQuery = useSelector((state) => state.search.query);
  const sortBy = useSelector((state) => state.sort.sortBy);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDomains());
    }
  }, [status, dispatch]);

  const handleMenuToggle = (index) => {
    setSelectedRowIndex((prev) => (prev === index ? null : index));
  };

  const handleTableClick = (event) => {
    if (selectedRowIndex !== null) {
      const menuElement = tableRef.current.querySelector(".dropdown-menu");
      const dotsButton = event.target.closest("button");
      if (menuElement && !menuElement.contains(event.target) && !dotsButton) {
        setSelectedRowIndex(null);
      }
    }
  };

  const filteredData = domains.filter((item) =>
    columns.some((col) =>
      String(item[col.key]).toLowerCase().includes(searchQuery.toLowerCase())
    )
  );

  const sortedData = React.useMemo(() => {
    let sortableData = [...filteredData];
    sortableData.sort((a, b) => {
      for (let col of columns) {
        const aValue = a[col.key];
        const bValue = b[col.key];
        if (aValue < bValue) return sortBy === "asc" ? -1 : 1;
        if (aValue > bValue) return sortBy === "asc" ? 1 : -1;
      }
      return 0;
    });
    return sortableData;
  }, [filteredData, sortBy, columns]);

  if (status === "loading") return <div>Loading...</div>;
  if (status === "failed") return <div>Error: {error}</div>;

  return (
    <div className="relative flex flex-col w-full h-full text-gray-700 bg-white shadow-md rounded-sm mt-5 border border-slate-300 overflow-y-scroll sm:overflow-y-visible">
      <table
        ref={tableRef}
        className="w-full text-left table-auto min-w-max"
        onClick={handleTableClick}
      >
        <thead>
          <tr>
            {columns.map((item) => (
              <th key={item.key} className="p-4 border-b border-slate-300">
                <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
                  {item.label}
                </p>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((item, index) => (
            <tr key={item.id}>
              <td className="p-4 border-b border-slate-300">
                <p className="flex items-center gap-3 font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
                  {item.isActive ? (
                    <span className="bg-green-500 w-2 h-2 block rounded-full"></span>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="red"
                      className="bi bi-exclamation-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16" />
                      <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0M7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0z" />
                    </svg>
                  )}
                  {item.domain}
                  <a href="#">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="11"
                      height="11"
                      fill="gray"
                      className="bi bi-box-arrow-up-right"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5"
                      />
                      <path
                        fillRule="evenodd"
                        d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0z"
                      />
                    </svg>
                  </a>
                </p>
              </td>
              <td className="p-4 border-b border-slate-300">
                <p
                  className={`block font-sans text-sm antialiased leading-normal font-medium ${
                    item.isActive ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {item.isActive ? "Active" : "Not Active"}
                </p>
              </td>
              <td className="p-4 border-b border-slate-300">
                <p
                  className={`block font-sans text-sm antialiased font-medium leading-normal ${
                    item.status === "verified"
                      ? "text-green-600"
                      : "text-red-600"
                  } ${item.status === "pending" ? "!text-amber-400" : null}`}
                >
                  {item.status === "verified" ? "Verified" : null}
                  {item.status === "pending" ? "Pending" : null}
                  {item.status === "rejected" ? "Not Verified" : null}
                </p>
              </td>
              <td className="p-4 border-b border-slate-300 relative">
                <button
                  onClick={() => handleMenuToggle(index)}
                  className="focus:outline-none"
                  aria-label="Toggle actions menu"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-three-dots-vertical"
                    viewBox="0 0 16 16"
                  >
                    <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0m0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0" />
                  </svg>
                </button>
                {selectedRowIndex === index && (
                  <div>
                    <DropdownMenu
                      domainId={item.id}
                      onClose={() => setSelectedRowIndex(null)}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
