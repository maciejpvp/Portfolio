import { ThreeEvent, useLoader } from "@react-three/fiber";
import { useControls } from "leva";
import { TextureLoader, RepeatWrapping } from "three";
import useCameraStore from "../Utils/useCameraStore";

export const Floor = () => {
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);
  const texture = useLoader(
    TextureLoader,
    `/floor.jpg`,
  );

  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(5, 4);

  const { positionX, positionY, positionZ, rotationY } = useControls(
    "Floor",
    {
      positionX: { value: -0.3, min: -1, max: 1, step: 0.001 },
      positionY: { value: 3.08, min: 3, max: 4, step: 0.00001 },
      positionZ: { value: -0.0139, min: -1, max: 1, step: 0.001 },
      rotationY: { value: Math.PI * 0.5, min: 0, max: Math.PI, step: 0.001 },
    },
    { collapsed: true },
  );

  return (
    <mesh
      receiveShadow
      position={[positionX, positionY, positionZ]}
      rotation={[0, rotationY, 0]}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setSelectedCamera(0);
      }}
    >
      <boxGeometry args={[0.4, 0.01, 0.4]} />
      <meshStandardMaterial map={texture} roughness={0.9} metalness={0.3} />
    </mesh>
  );
};
