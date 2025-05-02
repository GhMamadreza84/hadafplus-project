import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import Header from "./components/layout/Header.jsx";
import { Provider } from "react-redux";
import { store } from "./context/store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Header />
      <App />
    </Provider>
  </StrictMode>
);
