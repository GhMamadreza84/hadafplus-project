import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchDomains } from "../../context/features/domainSlice";
import Table from "./Table";

function DomainContainer() {
  const dispatch = useDispatch();
  const { domains, status, error } = useSelector((state) => state.domains);
  const searchQuery = useSelector((state) => state.search.query);
  const sortBy = useSelector((state) => state.sort.sortBy);

  let columns = [
    { key: "domain", label: "Domain URL" },
    {
      key: "isActive",
      label: "Active Status",
    },
    {
      key: "status",
      label: "Verification Status",
    },
    {
      key: "",
      label: "",
    },
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchDomains());
    }
  }, [status, dispatch]);

  const filteredDomains = searchQuery
    ? domains.filter((domain) =>
        domain.domain.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : domains;

  const sortedDomains = [...filteredDomains].sort((a, b) => {
    if (sortBy === "asc") {
      return a.domain.localeCompare(b.domain);
    }
    return b.domain.localeCompare(a.domain);
  });

  // console.log("Search Query:", searchQuery);
  // console.log("Sort By:", sortBy);
  // console.log("Filtered Domains:", filteredDomains);
  // console.log("Sorted Domains:", sortedDomains);

  if (status === "loading") {
    return <div className="p-4 text-center">Loading...</div>;
  }

  if (status === "failed") {
    return <div className="p-4 text-center text-red-500">Error: {error}</div>;
  }

  if (status === "succeeded" && filteredDomains.length === 0) {
    return <div className="p-4 text-center">No domains found</div>;
  }

  return <Table domains={sortedDomains} columns={columns} />;
}

export default DomainContainer;
