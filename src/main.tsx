import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "styles/scrollbar.css";
import "styles/tailwind.css";
import "styles/transitions.css";
import "utils/i18n";
import App from "./App";

const rootDom = document.getElementById("root");

if (rootDom) {
  createRoot(rootDom).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
