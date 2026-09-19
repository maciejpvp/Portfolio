import { createRoot } from "react-dom/client";

import "./index.css";
import { Shell } from "./Components/MacbookWebsite/Shell";
import { TABS, type TabId } from "./Components/MacbookWebsite/Nav";
import { ScreenSurface } from "./Components/ScreenSurface";

/**
 * Dev harness: renders the MacBook screen at its true 1920x1191 authoring size, outside
 * the 3D scene. The screen is normally only visible shrunk onto the laptop lid, which
 * makes it impractical to check the per-panel height budgets that Shell.tsx documents.
 *
 * Open /screen-preview.html, or /screen-preview.html?tab=Work for a specific panel.
 */
const requested = new URLSearchParams(location.search).get("tab");
const defaultTab = TABS.find((tab) => tab === requested) as TabId | undefined;

createRoot(document.getElementById("root")!).render(
  <ScreenSurface boxWidth={1920} boxHeight={1191}>
    <Shell defaultTab={defaultTab} />
  </ScreenSurface>,
);
