import { useThree, useFrame } from "react-three-fiber";
import { button, useControls } from "leva";
import { Desk } from "./Components/Desk";
import { useEffect, useRef, useState } from "react";
import { Macbook } from "./Components/Macbook";
import { Mesh } from "three";
import { Lights } from "./Components/Lights";
// import { IPhone } from "./Components/Iphone";
import { Coffee } from "./Components/Coffee";
import { Physics } from "@react-three/rapier";
import { Gamepad } from "./Components/GamePad";
import * as THREE from "three";
import { cameraPresets } from "./Utils/cameraPresets.ts";
import useCameraStore from "./Utils/store.ts";
import { HeadsetStand } from "./Components/HeadsetStand.tsx";
import { Headset } from "./Components/Headset.tsx";

export const Fiber = () => {
  const three = useThree();
  const camera = three.camera;
  const lookAtMeshRef = useRef<Mesh>(null!);
  const selectedCamera = useCameraStore((state) => state.selectedCamera);
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const {
    positionX,
    positionY,
    positionZ,
    lookAtPosX,
    lookAtPosY,
    lookAtPosZ,
    freeCamera,
    targetVisible,
  } = useControls(
    "Camera",
    {
      positionX: { value: -0.078, min: -0.25, max: 0, step: 0.001 },
      positionY: { value: 3.25, min: 3.23, max: 3.3, step: 0.001 },
      positionZ: { value: -0.02, min: -1, max: 1, step: 0.001 },
      lookAtPosX: { value: -0.4, min: -1, max: 1, step: 0.001 },
      lookAtPosY: { value: 3.19, min: 3, max: 4, step: 0.001 },
      lookAtPosZ: { value: -0.02, min: -1, max: 1, step: 0.001 },
      targetVisible: false,
      freeCamera: false,
    },
    { collapsed: true }
  );

  useControls("Camera Presets", {
    default: button(() => setSelectedCamera(0)),
    gamepad: button(() => setSelectedCamera(1)),
    macbook: button(() => setSelectedCamera(2)),
    headset: button(() => setSelectedCamera(3)),
    logPosition: button(() => {
      console.log(
        { positionX, positionY, positionZ },
        { lookAtPosX, lookAtPosY, lookAtPosZ }
      );
    }),
  });

  const miscDebug = useControls(
    "Misc",
    {
      showCollisions: false,
    },
    { collapsed: true }
  );

  useFrame(() => {
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      freeCamera ? positionX : cameraPresets[selectedCamera].positionX,
      0.1
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      freeCamera ? positionY : cameraPresets[selectedCamera].positionY,
      0.1
    );
    camera.position.z = THREE.MathUtils.lerp(
      camera.position.z,
      freeCamera ? positionZ : cameraPresets[selectedCamera].positionZ,
      0.1
    );

    lookAtMeshRef.current.position.x = THREE.MathUtils.lerp(
      lookAtMeshRef.current.position.x,
      freeCamera ? lookAtPosX : cameraPresets[selectedCamera].lookAtX,
      0.1
    );
    lookAtMeshRef.current.position.y = THREE.MathUtils.lerp(
      lookAtMeshRef.current.position.y,
      freeCamera ? lookAtPosY : cameraPresets[selectedCamera].lookAtY,
      0.1
    );
    lookAtMeshRef.current.position.z = THREE.MathUtils.lerp(
      lookAtMeshRef.current.position.z,
      freeCamera ? lookAtPosZ : cameraPresets[selectedCamera].lookAtZ,
      0.1
    );

    camera.lookAt(lookAtMeshRef.current.position);
  });

  return (
    <>
      <color attach="background" args={["#262626"]} />
      <Lights />
      <mesh
        ref={lookAtMeshRef}
        scale={targetVisible ? 0.03 : 0}
        // position={[lookAtPosX, lookAtPosY, lookAtPosZ]}
      >
        <meshBasicMaterial color={"red"} />
        <boxGeometry />
      </mesh>
      <Physics debug={miscDebug.showCollisions} gravity={[0, -1, 0]}>
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
        <Coffee scale={0.0011} offset={-0.013} />
        <Coffee scale={0.0011} offset={-0.026} />
        {/* <Coffee scale={0.0011} position={[-0.225, 3.195, -0.093]} /> */}
        <Gamepad scale={0.1} position={[0.2, 3, 0]} />
        {/* <HeadsetStand scale={0.1} position={[0.2, 3, 0]} /> */}
        <Headset scale={0.1} position={[0.2, 3, 0]} />
      </Physics>
    </>
  );
};
