import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeDrawer, openDrawer } from "../../context/features/drawerSlice";

const Drawer = ({ children }) => {
  const open = useSelector((state) => state.drawer.open);
  const dispatch = useDispatch();
  const drawerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (drawerRef.current && !drawerRef.current.contains(event.target)) {
        dispatch(closeDrawer());
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open, dispatch]);

  return (
    <div>
      <button
        onClick={() => dispatch(openDrawer())}
        className="bg-sky-600 flex justify-center items-center text-white text-sm sm:text-base w-36 sm:w-40 rounded-sm px-4 py-2 cursor-pointer"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          fill="white"
          class="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
        </svg>
        Add Domain
      </button>

      <nav
        ref={drawerRef}
        className={`flex flex-col fixed z-50 top-0 right-0 h-screen w-1/2 sm:w-1/3 bg-white p-4 sm:p-8 transform transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={() => dispatch(closeDrawer())}
          className={` ${
            !open ? "hidden" : null
          } cursor-pointer absolute -left-10`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="white"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="relative h-full">{children}</div>
      </nav>
      {open ? (
        <div className="bg-black opacity-40 fixed top-0 left-0 w-full h-full z-10"></div>
      ) : null}
    </div>
  );
};

export default Drawer;
