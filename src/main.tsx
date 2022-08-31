import "@/styles/scrollbar.css";
import "@/styles/tailwind.css";
import "@/styles/transitions.css";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./utils/i18n";

const rootDom = document.getElementById("root");

if (rootDom) {
  createRoot(rootDom).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
