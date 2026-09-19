import { CanvasContainer } from "./Components/CanvasContainer";
import { Fiber } from "./Fiber";
import { Suspense, useState } from "react";
import { Loader, useProgress } from "@react-three/drei";
import { SquareText, Wallpaper } from "lucide-react";
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

const wantsPlainView = () => {
  try {
    return new URLSearchParams(window.location.search).has("plain");
  } catch {
    return false;
  }
};

const StaticVersionButton = ({ onClick }: { onClick: () => void }) => {
  const { active, progress } = useProgress();
  if (!active && progress >= 100) return null;
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        position: "fixed",
        left: "50%",
        bottom: "2rem",
        transform: "translateX(-50%)",
        zIndex: 1001,
        padding: "0.6rem 1.2rem",
        borderRadius: "999px",
        border: "1px solid #78716c",
        background: "transparent",
        color: "#e7e5e4",
        fontFamily: "Montserrat",
        cursor: "pointer",
      }}
    >
      Use static version instead
    </button>
  );
};

export const App = () => {
  const [plainRequested, setPlainRequested] = useState(wantsPlainView);
  const [canRender3D] = useState(
    () => supportsWebGL()
  );
  const showPlainView = plainRequested || !canRender3D;

  return (
    <>
      {canRender3D && (
        <button
          type="button"
          aria-label={
            showPlainView ? "Switch to 3D version" : "Switch to static version"
          }
          title={showPlainView ? "3D version" : "Static version"}
          onClick={() => setPlainRequested(!showPlainView)}
          className="print:hidden"
          style={{
            position: "fixed",
            right: "1.25rem",
            bottom: "1.25rem",
            zIndex: 1002,
            width: "3rem",
            height: "3rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            border: "1px solid #78716c",
            background: "#1C1917",
            color: "#e7e5e4",
            cursor: "pointer",
          }}
        >
          {showPlainView ? <Wallpaper size={22} /> : <SquareText size={22} />}
        </button>
      )}
      {showPlainView ? (
        // Only offer the 3D link to visitors whose device could actually render it.
        <PlainView
          showSceneLink={plainRequested && canRender3D}
        />
      ) : (
        <div className="canvas">
          <Loader
            containerStyles={{ backgroundColor: "#1C1917" }}
            innerStyles={{ width: "20rem", height: "0.5rem" }}
            barStyles={{ height: "100%", borderRadius: "20px" }}
            dataInterpolation={(p) => `Crafting the world…${p.toFixed(0)}%`}
            dataStyles={{ fontSize: "1.5rem", fontFamily: "Montserrat" }}
          />
          <StaticVersionButton onClick={() => setPlainRequested(true)} />
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
