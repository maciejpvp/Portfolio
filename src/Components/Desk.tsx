import { useGLTF } from "@react-three/drei";
import { ReactThreeFiber } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import * as THREE from "three";

type PrimitiveProps = Omit<
  ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>,
  "object"
>;

export const Desk = (props: PrimitiveProps) => {
  const { scene } = useGLTF("./desk.gltf");

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
      <primitive {...props} object={scene} position={position} receiveShadows />
      ;
    </RigidBody>
  );
};
