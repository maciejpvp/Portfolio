import { useHelper } from "@react-three/drei";
import { useRef, useEffect } from "react"; // Import useEffect
import { DirectionalLight, DirectionalLightHelper } from "three";
import { useControls } from "leva";

export const Lights = () => {
  const directionalLightRef = useRef<DirectionalLight>(null!);

  const [
    {
      positionX,
      positionY,
      positionZ,
      targetPositionX,
      targetPositionY,
      targetPositionZ,
      targetVisible,
      helperVisible,
    },
    set,
  ] = useControls(
    "Lights",
    () => ({
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
      helperVisible: true,
    }),
    { collapsed: true },
  );

  useEffect(() => {
    set({ helperVisible: false });
  }, [set]);

  useHelper(
    helperVisible ? directionalLightRef : null,
    DirectionalLightHelper,
    0.1,
  );

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
      <ambientLight intensity={0.2} />
      <directionalLight
        castShadow={false}
        ref={directionalLightRef}
        position={[positionX, positionY, positionZ]}
        target-position={[targetPositionX, targetPositionY, targetPositionZ]}
        intensity={2}
      />
    </>
  );
};
