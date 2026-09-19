import { ReactNode } from "react";

type Props = {
  /** DOM box handed to <Html>, in CSS px. Matches the screen mesh's aspect exactly. */
  boxWidth: number;
  boxHeight: number;
  children: ReactNode;
};

/**
 * Fixes the size of the DOM box drei lays out, and matches it to the screen mesh's own
 * aspect ratio so nothing letterboxes.
 *
 * This box is also the effective *resolution* of the screen. drei's <Html transform>
 * ends up magnified by the CSS perspective, and the compositor magnifies the rasterised
 * layer rather than re-rendering it at the final scale — so a box smaller than the
 * screen's on-screen size comes out blurry. Keep it at least as large as the screen ever
 * appears; shrinking it to dodge drei's wrapper clip is not worth the sharpness, and the
 * `.r3f-screen` rule in index.css removes that clip anyway.
 */
export const ScreenSurface = ({ boxWidth, boxHeight, children }: Props) => (
  <div style={{ width: boxWidth, height: boxHeight, overflow: "hidden" }}>
    {children}
  </div>
);
