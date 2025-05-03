import React from "react";

const DropdownMenu = ({ onClose, onSelect }) => {
  const menuItems = [
    { label: "Veiw Pages", value: "view", disabled: true },
    { label: "Verify", value: "verify", disabled: false },
    { label: "Active", value: "active", disabled: false },
    { label: "Install Script", value: "install", disabled: true },
    { label: "Delete", value: "delete", danger: true, disabled: false },
  ];
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
      {menuItems.map((item) => (
        <button
          key={item.value}
          onClick={() => {
            onSelect(value);
            onClose();
          }}
          disabled={item.disabled ? true : false}
          className={`w-full text-left px-4 py-2 text-sm   ${
            item.disabled
              ? "text-slate-200 "
              : "text-gray-700 hover:bg-gray-100"
          } ${item.danger ? "text-red-600 hover:bg-red-50" : ""}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default DropdownMenu;
