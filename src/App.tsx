import { Canvas } from "@react-three/fiber";
import { CanvasWrapper } from "@isaac_ua/drei-html-fix";
import { Fiber } from "./Fiber";
import { Suspense } from "react";
import { PerspectiveCamera } from "@react-three/drei";

export const App = () => {
  return (
    <div className="canvas">
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
            position: [20, 5, 0],
            fov: 30,
            near: 0.001,
            far: 10,
          },
        }}
      >
        {/* <PerspectiveCamera makeDefault={true} /> */}
        <Suspense fallback={null}>
          <Fiber />
        </Suspense>
      </CanvasWrapper>
    </div>
  );
};
