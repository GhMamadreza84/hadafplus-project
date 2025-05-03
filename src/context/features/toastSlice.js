import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const toastSlice = createSlice({
  name: "toast",
  initialState: [],
  reducers: {
    showToast: (state, action) => {
      const { message, type } = action.payload;
      toast[type](message, {
        position: "top-left",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    },
  },
});

export const { showToast } = toastSlice.actions;
export default toastSlice.reducer;
