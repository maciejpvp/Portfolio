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

  const { positionX, positionY, positionZ } = useControls("Iphone", {
    positionX: { value: -0.215, min: -1, max: 1, step: 0.001 },
    positionY: { value: 2, min: 3, max: 4, step: 0.001 },
    positionZ: { value: 0.04, min: -1, max: 1, step: 0.001 },
  });

  return (
    <primitive
      {...props}
      object={scene}
      position={[positionX, 3.21, positionZ]}
    />
  );
};
