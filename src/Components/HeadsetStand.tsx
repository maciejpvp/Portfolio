import * as THREE from "three";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { folder, useControls } from "leva";

type GLTFResult = GLTF & {
  nodes: {
    Cylinder028: THREE.Mesh;
    Cylinder028_1: THREE.Mesh;
    Cylinder028_2: THREE.Mesh;
    Cylinder028_3: THREE.Mesh;
  };
  materials: {
    RoughAluminiumMaterial: THREE.MeshStandardMaterial;
    RubberMaterial: THREE.MeshStandardMaterial;
    GlossySteelMaterial: THREE.MeshStandardMaterial;
    ["Rubber Benks.001"]: THREE.MeshStandardMaterial;
  };
};

export const HeadsetStand = (props: JSX.IntrinsicElements["group"]) => {
  const { nodes, materials } = useGLTF("/HeadphoneStand.glb") as GLTFResult;
  const headsetDebug = useControls("Headset Stand", {
    Position: folder({
      positionX: { value: -0.23, min: -0.4, max: -0.2, step: 0.001 },
      positionY: { value: 3.1935, min: 3, max: 3.2, step: 0.001 },
      positionZ: { value: 0.03, min: -0.2, max: 0.2, step: 0.001 },
    }),
    Rotation: folder({
      rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
      rotationY: { value: 2.24, min: 0, max: Math.PI * 2, step: 0.001 },
      rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
    }),
    scale: { value: 0.0136, min: 0.1, max: 0.4, step: 0.0001 },
  });
  return (
    <group
      {...props}
      dispose={null}
      scale={headsetDebug.scale}
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
    >
      <group position={[-0.054, 0.006, -0.083]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder028.geometry}
          material={materials.RoughAluminiumMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder028_1.geometry}
          material={materials.RubberMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder028_2.geometry}
          material={materials.GlossySteelMaterial}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder028_3.geometry}
          material={materials["Rubber Benks.001"]}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/HeadphoneStand.glb");
