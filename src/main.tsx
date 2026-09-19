import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// reset.css is imported by index.css into Tailwind's `base` layer — see the note there.
// Importing it here as well would reintroduce it as an unlayered stylesheet.
import "./index.css";
import { App } from "./App.tsx";
import { Leva } from "leva";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <Leva hidden />
  </StrictMode>,
);
