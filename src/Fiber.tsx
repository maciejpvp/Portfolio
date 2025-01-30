import { useThree, useFrame } from "react-three-fiber";
import { useControls } from "leva";
import { Desk } from "./Components/Desk";
import { useRef } from "react";
import { Macbook } from "./Components/Macbook";
import { Mesh } from "three";
import { Lights } from "./Components/Lights";
import { IPhone } from "./Components/Iphone";
import { Coffee } from "./Components/Coffee";
import { Physics } from "@react-three/rapier";
import { Gamepad } from "./Components/GamePad";

export const Fiber = () => {
  const three = useThree();
  const camera = three.camera;
  const lookAtMeshRef = useRef<Mesh>(null!);

  const {
    positionX,
    positionY,
    positionZ,
    lookAtPosX,
    lookAtPosY,
    lookAtPosZ,
    targetVisible,
  } = useControls(
    "Camera",
    {
      positionX: { value: -0.06, min: -1, max: 1, step: 0.001 },
      positionY: { value: 3.24, min: 3, max: 4, step: 0.001 },
      positionZ: { value: -0.02, min: -1, max: 1, step: 0.001 },
      lookAtPosX: { value: -0.4, min: -1, max: 1, step: 0.001 },
      lookAtPosY: { value: 3.19, min: 3, max: 4, step: 0.001 },
      lookAtPosZ: { value: -0.02, min: -1, max: 1, step: 0.001 },
      targetVisible: false,
    },
    { collapsed: true },
  );

  useFrame(() => {
    camera.position.x = positionX;
    camera.position.y = positionY;
    camera.position.z = positionZ;
    camera.lookAt(lookAtMeshRef.current.position);
  });

  return (
    <>
      <color attach="background" args={["#262626"]} />
      <Lights />
      <mesh
        ref={lookAtMeshRef}
        scale={targetVisible ? 0.03 : 0}
        position={[lookAtPosX, lookAtPosY, lookAtPosZ]}
      >
        <meshBasicMaterial color={"red"} />
        <boxGeometry />
      </mesh>
      <Physics gravity={[0, -1, 0]}>
        <Desk scale={0.1} />
        <Macbook
          scale={0.02}
          position={[0.2, 3, 0]}
          rotation-y={Math.PI * 0.5}
        />
        {/* <IPhone */}
        {/*   scale={0.01} */}
        {/*   rotation-x={Math.PI * 0.5} */}
        {/*   rotation-y={Math.PI} */}
        {/*   rotation-z={Math.PI * -0.5} */}
        {/* /> */}
        <Coffee scale={0.0011} />
        <Gamepad scale={0.1} position={[0.2, 3, 0]} />
      </Physics>
    </>
  );
};
