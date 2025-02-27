import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { folder, useControls } from "leva";
import useCameraStore from "../Utils/store";

type GLTFResult = GLTF & {
  nodes: {
    Cushion: THREE.Mesh;
    Ear_Cup: THREE.Mesh;
    Cylinder025: THREE.Mesh;
    Cylinder025_1: THREE.Mesh;
    ["Mid-"]: THREE.Mesh;
    Seprator: THREE.Mesh;
    Seprator001: THREE.Mesh;
  };
  materials: {
    Cushion: THREE.MeshStandardMaterial;
    ["Black-1"]: THREE.MeshStandardMaterial;
    GlowBlue: THREE.MeshStandardMaterial;
    ["Black-2"]: THREE.MeshStandardMaterial;
    Connector: THREE.MeshStandardMaterial;
  };
};

export const Headset = (props: JSX.IntrinsicElements["group"]) => {
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);
  const { nodes, materials } = useGLTF("/headset.gltf") as GLTFResult;
  const headsetDebug = useControls("Headset", {
    Position: folder({
      positionX: { value: -0.221, min: -0.4, max: -0.2, step: 0.001 },
      positionY: { value: 3.1925, min: 3, max: 3.2, step: 0.001 },
      positionZ: { value: 0.023, min: -0.2, max: 0.2, step: 0.001 },
    }),
    Rotation: folder({
      rotationX: { value: 1.631, min: 0, max: Math.PI * 2, step: 0.001 },
      rotationY: { value: 3.286, min: 0, max: Math.PI * 2, step: 0.001 },
      rotationZ: { value: 5.001, min: 0, max: Math.PI * 2, step: 0.001 },
    }),
    scale: { value: 0.0104, min: 0.01, max: 0.04, step: 0.0001 },
  });
  console.log(headsetDebug);
  return (
    <group
      {...props}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedCamera(3);
      }}
      dispose={null}
      position={[
        headsetDebug.positionX,
        headsetDebug.positionY,
        headsetDebug.positionZ,
      ]}
      rotation={[
        headsetDebug.rotationX,
        headsetDebug.rotationY,
        headsetDebug.rotationZ,
      ]}
      scale={headsetDebug.scale}
    >
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cushion.geometry}
        material={materials.Cushion}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Ear_Cup.geometry}
        material={materials["Black-1"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes["Mid-"].geometry}
        material={materials["Black-2"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Seprator.geometry}
        material={materials.Connector}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Seprator001.geometry}
        material={materials["Black-1"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder025.geometry}
        material={materials["Black-1"]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder025_1.geometry}
        material={materials.GlowBlue}
      />
    </group>
  );
};

useGLTF.preload("/headset.gltf");
