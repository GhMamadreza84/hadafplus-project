import { configureStore } from "@reduxjs/toolkit";
import drawerSlice from "./features/drawerSlice";
import domainReducer from "./features/domainSlice";
import searchReducer from "./features/searchSlice";
import sortReducer from "./features/sortSlice";
export const store = configureStore({
  reducer: {
    drawer: drawerSlice,
    domains: domainReducer,
    search: searchReducer,
    sort: sortReducer,
  },
});
