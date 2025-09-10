import { CanvasWrapper } from "@isaac_ua/drei-html-fix";
import { Fiber } from "./Fiber";
import { Suspense } from "react";
import { Loader } from "@react-three/drei";

export const App = () => {
  return (
    <div className="canvas">
      <Loader
        containerStyles={{ backgroundColor: "#1C1917" }}
        innerStyles={{ width: "20rem", height: "0.5rem" }}
        barStyles={{ height: "100%", borderRadius: "20px" }}
        dataInterpolation={(p) => `Crafting the world…${p.toFixed(0)}%`}
        dataStyles={{ fontSize: "1.5rem", fontFamily: "Montserrat" }}
      />
      <div className="absolute w-screen h-screen bg-stone-900" />
      <CanvasWrapper
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
      </CanvasWrapper>
    </div>
  );
};
