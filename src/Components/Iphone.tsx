import { useGLTF } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { useControls } from "leva";
import * as THREE from "three";

type PrimitiveProps = Omit<
  ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>,
  "object"
>;

export const IPhone = (props: PrimitiveProps) => {
  const { scene } = useGLTF("./iphone.gltf");

  const { positionX, positionY, positionZ, scale } = useControls(
    "Iphone",
    {
      positionX: { value: -0.24, min: -0.315, max: -0.1, step: 0.001 },
      positionY: { value: 3.1925, min: 3, max: 4, step: 0.00001 },
      positionZ: { value: 0.03, min: 0.03, max: 0.04, step: 0.001 },
      scale: { value: 0.008, min: 0, max: 0.01, step: 0.001 },
    },
    { collapsed: true },
  );

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      child.receiveShadow = true;
    }
  });

  return (
    <primitive
      {...props}
      object={scene}
      position={[positionX, positionY, positionZ]}
      scale={scale}
    />
  );
};
