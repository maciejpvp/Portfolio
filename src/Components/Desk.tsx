import { meshBounds, useGLTF } from "@react-three/drei";
import { ThreeElements, ThreeEvent, useLoader } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useControls } from "leva";
import * as THREE from "three";
import useCameraStore from "../Utils/useCameraStore";

type PrimitiveProps = Omit<ThreeElements["primitive"], "object">;

export const Desk = (props: PrimitiveProps) => {
  const { scene } = useGLTF(`${import.meta.env.BASE_URL}/desk.gltf`);
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const { position, roughness, metalness } = useControls(
    "Desk",
    {
      position: { value: [0.2, 0, 0], step: 0.1 },
      roughness: { value: 6, min: 0, max: 10, step: 0.05 },
      metalness: { value: 0.1, min: 0, max: 10, step: 0.05 },
    },
    { collapsed: true },
  );

  const texture = useLoader(
    THREE.TextureLoader,
    `${import.meta.env.BASE_URL}/Desk/desk.jpg`,
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
              mat.map = texture;
              mat.needsUpdate = true;
            }
          });
        } else if (mesh.material instanceof THREE.MeshStandardMaterial) {
          mesh.material.roughness = roughness;
          mesh.material.metalness = metalness;
          mesh.material.map = texture; // <-- apply texture
          mesh.material.needsUpdate = true; // <-- important!
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
