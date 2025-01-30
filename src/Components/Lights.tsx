import { useHelper } from "@react-three/drei";
import { useRef } from "react";
import { DirectionalLight, DirectionalLightHelper } from "three";
import { useControls } from "leva";

export const Lights = () => {
  const directionalLightRef = useRef<DirectionalLight>(null!);
  useHelper(directionalLightRef, DirectionalLightHelper, 0.1);

  const {
    positionX,
    positionY,
    positionZ,
    targetPositionX,
    targetPositionY,
    targetPositionZ,
    targetVisible,
  } = useControls(
    "DirectionalLight",
    {
      positionX: {
        value: -0.17,
        min: -1,
        max: 1,
        step: 0.0001,
      },
      positionY: {
        value: 3.41,
        min: 3,
        max: 5,
        step: 0.0001,
      },
      positionZ: {
        value: -0.14,
        min: -1,
        max: 1,
        step: 0.0001,
      },
      targetVisible: false,
      targetPositionX: { value: -0.23, min: -1, max: 1, step: 0.001 },
      targetPositionY: { value: 3.2, min: 3, max: 4, step: 0.001 },
      targetPositionZ: { value: 0.02, min: -1, max: 1, step: 0.001 },
    },
    { collapsed: true },
  );

  const directionalLightSize = 0.1;
  return (
    <>
      <mesh
        scale={targetVisible ? 0.01 : 0}
        position={[targetPositionX, targetPositionY, targetPositionZ]}
        receiveShadow
      >
        <meshBasicMaterial color={"blue"} />
        <boxGeometry />
      </mesh>
      <ambientLight intensity={0.5} />
      <directionalLight
        castShadow={true}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.001}
        shadow-camera-far={1}
        shadow-camera-top={directionalLightSize}
        shadow-camera-right={directionalLightSize}
        shadow-camera-bottom={-directionalLightSize}
        shadow-camera-left={-directionalLightSize}
        shadow-bias={-0.01}
        ref={directionalLightRef}
        position={[positionX, positionY, positionZ]}
        target-position={[targetPositionX, targetPositionY, targetPositionZ]}
        intensity={2}
      />
    </>
  );
};
