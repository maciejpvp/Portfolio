import { Html, useGLTF } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef } from "react";
import * as THREE from "three";
import { App } from "./MacbookWebsite/App";

type PrimitiveProps = Omit<
  ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>,
  "object"
>;

export const Macbook = (props: PrimitiveProps) => {
  const { scene } = useGLTF("./laptop.gltf");
  const macbookRef = useRef<THREE.Object3D>(null!);

  const { positionX, positionY, positionZ, screenRotation } = useControls(
    "Macbook",
    {
      positionX: { value: -0.22, min: -1, max: 1, step: 0.0001 },
      positionY: { value: 3.184, min: 3, max: 4, step: 0.0001 },
      positionZ: { value: -0.02, min: -1, max: 1, step: 0.0001 },
      screenRotation: { value: 1.35, min: 0.9, max: Math.PI, step: 0.0001 },
    },
    { collapsed: true },
  );

  scene.traverse((child) => {
    child.receiveShadow = true;
    child.castShadow = true;
  });

  if (macbookRef.current) {
    macbookRef.current.children[0].children[15].rotation.x = screenRotation;
  }

  return (
    <>
      <primitive
        {...props}
        object={scene}
        position={[positionX, positionY, positionZ]}
        ref={macbookRef}
      ></primitive>
      {/* <Html> */}
      {/*   <App /> */}
      {/* </Html> */}
    </>
  );
};
