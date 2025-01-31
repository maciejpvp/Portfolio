import * as THREE from "three";
import { useState } from "react";
import { meshBounds, useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { folder, useControls } from "leva";
import useCameraStore from "../Utils/store";
import { ThreeEvent } from "react-three-fiber";

type GLTFResult = GLTF & {
  nodes: {
    Plane030: THREE.Mesh;
    Plane030_1: THREE.Mesh;
    BezierCurve: THREE.Mesh;
    Cube001: THREE.Mesh;
    Cylinder001: THREE.Mesh;
    Cylinder002: THREE.Mesh;
    Plane001: THREE.Mesh;
    Plane009: THREE.Mesh;
    Plane010: THREE.Mesh;
  };
  materials: {
    ["Material.033"]: THREE.MeshPhysicalMaterial;
    ["Material.032"]: THREE.MeshStandardMaterial;
    ["Material.035"]: THREE.MeshStandardMaterial;
    ["Material.034"]: THREE.MeshPhysicalMaterial;
  };
};

export const Gamepad = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF("/gamepad.glb") as GLTFResult;
  const [clicked, setClicked] = useState<string | undefined>(undefined);
  const [clickSound] = useState(new Audio("/click.wav"));
  const selectedCamera = useCameraStore((state) => state.selectedCamera);
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);
  const gamepadDebug = useControls(
    "Gamepad",
    {
      Position: folder({
        positionX: { value: -0.226, min: -0.3, max: -0.2, step: 0.001 },
        positionY: { value: 3.1935, min: 3, max: 3.2, step: 0.001 },
        positionZ: { value: 0.04, min: -0.2, max: 0.2, step: 0.001 },
      }),
      Rotation: folder({
        rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
        rotationY: { value: 1.948, min: 0, max: Math.PI * 2, step: 0.001 },
        rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
      }),
      scale: { value: 0.0136, min: 0.01, max: 0.04, step: 0.0001 },
    },
    { collapsed: true },
  );

  console.log(gamepadDebug);

  const handleClick = (button: string) => {
    setClicked(button);
    clickSound.currentTime = 0;
    clickSound.play();
    setTimeout(() => setClicked(undefined), 150);
  };

  return (
    <group
      {...props}
      dispose={null}
      raycast={meshBounds}
      onPointerEnter={() =>
        selectedCamera !== 1 && (document.body.style.cursor = "pointer")
      }
      onPointerLeave={() => (document.body.style.cursor = "auto")}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setSelectedCamera(1);
        document.body.style.cursor = "auto";
      }}
      scale={gamepadDebug.scale}
      position={[
        gamepadDebug.positionX,
        gamepadDebug.positionY,
        gamepadDebug.positionZ,
      ]}
      rotation={[
        gamepadDebug.rotationX,
        gamepadDebug.rotationY,
        gamepadDebug.rotationZ,
      ]}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane030.geometry}
        material={materials["Material.033"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane030_1.geometry}
        material={materials["Material.032"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BezierCurve.geometry}
        material={materials["Material.035"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube001.geometry}
        material={materials["Material.035"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder001.geometry}
        material={materials["Material.034"]}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "auto")}
        position-y={clicked === "B" ? -0.025 : 0}
        onClick={() => handleClick("B")}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder002.geometry}
        material={materials["Material.034"]}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "auto")}
        position-y={clicked === "A" ? -0.025 : 0}
        onClick={() => handleClick("A")}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane001.geometry}
        material={materials["Material.035"]}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "auto")}
        position-y={clicked === "start" ? -0.025 : 0}
        onClick={() => handleClick("start")}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane009.geometry}
        material={materials["Material.035"]}
        onPointerEnter={() => (document.body.style.cursor = "pointer")}
        onPointerLeave={() => (document.body.style.cursor = "auto")}
        position-y={clicked === "select" ? -0.025 : 0}
        onClick={() => handleClick("select")}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane010.geometry}
        material={materials["Material.035"]}
        onClick={() => console.log("cross")}
      />
    </group>
  );
};

useGLTF.preload("/gamepad.glb");
