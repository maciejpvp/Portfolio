import { CanvasContainer } from "./Components/CanvasContainer";
import { Fiber } from "./Fiber";
import { Suspense, useState } from "react";
import { Loader } from "@react-three/drei";
import { PlainView } from "./Components/PlainView";

/**
 * The 3D scene runs on phones too, so the fallback is gated on capability rather than on
 * a user-agent guess (which also got iPadOS wrong — it reports itself as a Mac).
 */
const supportsWebGL = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ?? canvas.getContext("webgl"),
    );
  } catch {
    return false;
  }
};

/**
 * Narrower than this and the MacBook screen is unreadable no matter how large the type is:
 * the screen's DOM box is a fixed 1920px wide and the camera shrinks it to roughly a fifth
 * of the viewport width, so a portrait phone gets ~230 device px of usable screen. Capability
 * alone is the wrong test — such a phone renders the scene perfectly and still cannot be read.
 */
const MIN_SCENE_WIDTH = 900;

/** `?plain=1` is a deliberate, shareable link to the text version. */
const wantsPlainView = () => {
  try {
    return new URLSearchParams(window.location.search).has("plain");
  } catch {
    return false;
  }
};

export const App = () => {
  const [plainRequested] = useState(wantsPlainView);
  const [canRender3D] = useState(
    () => supportsWebGL() && window.innerWidth >= MIN_SCENE_WIDTH,
  );

  const showPlainView = plainRequested || !canRender3D;

  return (
    <>
      {showPlainView ? (
        // Only offer the 3D link to visitors whose device could actually render it.
        <PlainView showSceneLink={plainRequested && canRender3D} />
      ) : (
        <div className="canvas">
          <Loader
            containerStyles={{ backgroundColor: "#1C1917" }}
            innerStyles={{ width: "20rem", height: "0.5rem" }}
            barStyles={{ height: "100%", borderRadius: "20px" }}
            dataInterpolation={(p) => `Crafting the world…${p.toFixed(0)}%`}
            dataStyles={{ fontSize: "1.5rem", fontFamily: "Montserrat" }}
          />
          <div className="absolute w-screen h-screen bg-stone-900" />
          <CanvasContainer
            canvasProps={{
              shadows: true,
              dpr: [1, 2],
              gl: {
                antialias: true,
                powerPreference: "high-performance",
              },
              style: { background: "none" },
              camera: {
                position: [-0.058, 3.25, -0.02],
                fov: 30,
                near: 0.001,
                far: 10,
              },
            }}
          >
            <Suspense fallback={null}>
              <Fiber />
            </Suspense>
          </CanvasContainer>
        </div>
      )}
    </>
  );
};
