import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateDomain, deleteDomain } from "../../context/features/domainSlice";
import { showToast } from "../../context/features/toastSlice";

const DropdownMenu = ({ domainId, onClose }) => {
  const dispatch = useDispatch();
  const domains = useSelector((state) => state.domains.domains);
  const domain = domains.find((d) => d.id === domainId);

  const handleSelect = async (value) => {
    try {
      let actionResult;
      switch (value) {
        case "active":
          actionResult = await dispatch(
            updateDomain({
              id: domainId,
              updatedData: { isActive: !domain.isActive },
            })
          ).unwrap();
          break;
        case "verify":
          actionResult = await dispatch(
            updateDomain({
              id: domainId,
              updatedData: {
                status: domain.status === "verified" ? "rejected" : "verified",
              },
            })
          ).unwrap();
          break;
        case "delete":
          actionResult = await dispatch(deleteDomain(domainId)).unwrap();
          break;
        default:
          return;
      }

      dispatch(
        showToast({
          message: `${value === "delete" ? "delete" : "update"} successfuly `,
          type: "success",
        })
      );
    } catch (error) {
      dispatch(
        showToast({
          message: "Something went wrong pls try again later",
          type: "error",
        })
      );
    }
    onClose();
  };

  const menuItems = [
    { label: "Veiw Pages", value: "view", disabled: true },
    {
      label: domain?.status === "verified" ? "Not Verified" : "Verify",
      value: "verify",
    },
    {
      label: domain?.isActive ? "Not Active" : "Active",
      value: "active",
    },
    { label: "Install Script", value: "install", disabled: true },
    { label: "Delete", value: "delete", danger: true, disabled: false },
  ];

  return (
    <div className="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      {menuItems.map((item) => (
        <button
          key={item.value}
          onClick={() => handleSelect(item.value)}
          disabled={item.disabled ? true : false}
          className={`w-full text-left px-4 py-2 text-sm ${
            item.disabled
              ? "text-slate-200"
              : "text-gray-700 hover:bg-gray-100 cursor-pointer"
          } ${item.danger ? "text-red-600 hover:bg-red-50" : ""}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;
