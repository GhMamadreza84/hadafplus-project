import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { showToast } from "../../context/features/toastSlice";
import { fetchDomains } from "../../context/features/domainSlice";

const DrawerForm = ({ onSubmit: externalOnSubmit }) => {
  const dispatch = useDispatch();
  const [domainInput, setDomainInput] = useState("");

  const handleAddDomain = async () => {
    if (!domainInput.startsWith("https://www")) {
      dispatch(
        showToast({
          message: "Domain need to be start with https://www",
          type: "error",
        })
      );
      return;
    }

    try {
      const response = await fetch(
        "https://6797aa2bc2c861de0c6d964c.mockapi.io/domain",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            createdDate: Math.floor(Date.now() / 1000),
            domain: domainInput,
            status: "pending",
            isActive: true,
          }),
        }
      );

      if (response.ok) {
        dispatch(fetchDomains());
        dispatch(
          showToast({ message: "Domain added successfuly", type: "success" })
        );
        setDomainInput("");
        if (externalOnSubmit) externalOnSubmit();
      } else {
        throw new Error("Failed to create domain");
      }
    } catch (error) {
      dispatch(
        showToast({
          message: "Failed to add domain , pls try again later",
          type: "error",
        })
      );
    }
  };

  return (
    <div className="relative h-full">
      <h2 className="text-xl mb-4">Add domain</h2>
      <input
        type="text"
        placeholder="Ex: https://www.bridge.media"
        value={domainInput}
        onChange={(e) => setDomainInput(e.target.value)}
        className="outline-none placeholder:text-slate-300 border border-slate-200 w-full px-1 py-2 rounded-sm"
      />
      <div className="absolute bottom-0 right-0 flex gap-4">
        <button
          onClick={() => {
            if (externalOnSubmit) externalOnSubmit();
          }}
          className="border border-slate-200 w-20 rounded-sm cursor-pointer"
        >
          Cancel
        </button>
        <button
          onClick={handleAddDomain}
          className="bg-sky-600 flex justify-center items-center text-white w-20 rounded-sm px-4 py-2 cursor-pointer"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default DrawerForm;
