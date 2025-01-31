import { meshBounds, useGLTF } from "@react-three/drei";
import { ReactThreeFiber, ThreeEvent } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import * as THREE from "three";
import useCameraStore from "../Utils/store";

type PrimitiveProps = Omit<
  ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>,
  "object"
>;

export const Desk = (props: PrimitiveProps) => {
  const { scene } = useGLTF("./desk.gltf");
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const { position } = useControls(
    "Desk",
    {
      position: { value: [0.2, 0, 0], step: 0.1 },
    },
    { collapsed: true },
  );

  scene.traverse((child) => {
    child.receiveShadow = true;
  });

  return (
    <RigidBody type="fixed" restitution={1}>
      <primitive
        {...props}
        object={scene}
        raycast={meshBounds}
        position={position}
        receiveShadows
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          setSelectedCamera(0);
        }}
      />
      ;
    </RigidBody>
  );
};
