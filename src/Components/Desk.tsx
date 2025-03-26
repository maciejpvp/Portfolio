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

  const { position, roughness, metalness } = useControls(
    "Desk",
    {
      position: { value: [0.2, 0, 0], step: 0.1 },
      roughness: { value: 0.9, min: 0, max: 1, step: 0.05 },
      metalness: { value: 0.3, min: 0, max: 1, step: 0.05 },
    },
    { collapsed: true },
  );

  scene.traverse((child) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.receiveShadow = true;

      if (mesh.material) {
        if (Array.isArray(mesh.material)) {
          mesh.material.forEach((mat) => {
            if (mat instanceof THREE.MeshStandardMaterial) {
              mat.roughness = roughness;
              mat.metalness = metalness;
            }
          });
        } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.roughness = roughness;
          mesh.material.metalness = metalness;
        }
      }
    }
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
    </RigidBody>
  );
};
