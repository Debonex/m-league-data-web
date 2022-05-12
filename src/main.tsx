import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "@/styles/tailwind.css";
import "@/styles/scrollbar.css";

const rootDom = document.getElementById("root");

if (rootDom) {
  createRoot(rootDom).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
