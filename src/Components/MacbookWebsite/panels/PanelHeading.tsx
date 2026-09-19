import type { ReactNode } from "react";

/**
 * `reset.css` sets `text-wrap: balance` on headings, which can move a break earlier and
 * turn a heading budgeted at one line into two — quietly costing 74px of panel height.
 * `whitespace-nowrap` pins it.
 */
export const PanelHeading = ({ children }: { children: ReactNode }) => (
  <h2 className="text-h2 shrink-0 whitespace-nowrap">{children}</h2>
);
