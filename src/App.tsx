import { Canvas } from "@react-three/fiber";
import { Fiber } from "./Fiber";
import { Suspense } from "react";
import { OrbitControls } from "@react-three/drei";

export const App = () => {
  return (
    <div className="canvas">
      <Canvas
        shadows
        camera={{ position: [0, 3.5, 0], fov: 45, near: 0.001, far: 10 }}
      >
        <Suspense fallback={null}>
          <Fiber />
          <OrbitControls />
        </Suspense>
      </Canvas>
    </div>
  );
};
