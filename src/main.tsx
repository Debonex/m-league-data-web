import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const rootDom = document.getElementById("root");

if (rootDom) {
  createRoot(rootDom).render(
    <StrictMode>
      <div>M league data</div>
    </StrictMode>
  );
}
