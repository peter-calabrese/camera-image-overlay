import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

import Camera from "./components/Camera";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Camera />
  </StrictMode>
);
