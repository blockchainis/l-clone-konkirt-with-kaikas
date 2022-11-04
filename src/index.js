import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AuthProvider from "@components/molecules/AuthProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

if (process.env.NODE_ENV === "development") {
  const { worker } = require("./mock/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
    <ToastContainer theme="dark" />
  </React.StrictMode>
);
