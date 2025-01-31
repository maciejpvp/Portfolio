import * as THREE from "three";
import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import {
  RigidBody,
  MeshCollider,
  RapierRigidBody,
  CapsuleCollider,
} from "@react-three/rapier";
import { folder, useControls } from "leva";

// Define the structure of the GLTF model
interface GLTFResult extends GLTF {
  nodes: {
    cup: THREE.Mesh;
  };
  //eslint-disable-next-line
  materials: {};
}

export function Coffee({
  offset = 0,
  ...props
}: JSX.IntrinsicElements["group"] & { offset?: number }) {
  const coffeeRef = useRef<RapierRigidBody>(null!);
  const { nodes } = useGLTF("/coffee.glb") as GLTFResult;
  const texture = useTexture("/coffee.jpg");
  const textureNormal = useTexture("/coffeeNormal.jpg");
  texture.flipY = false;

  const { positionX, positionY, positionZ, rotationX, rotationY, rotationZ } =
    useControls(
      "Coffee",
      {
        Position: folder({
          positionX: { value: -0.23, min: -1, max: 0, step: 0.0001 },
          positionY: { value: 3.19, min: 3, max: 4, step: 0.00001 },
          positionZ: { value: -0.08, min: -0.2, max: 0.2, step: 0.001 },
        }),
        Rotation: folder({
          rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
          rotationY: { value: 0.95, min: 0, max: Math.PI * 2, step: 0.001 },
          rotationZ: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
        }),
      },
      { collapsed: true },
    );

  const handleClick = () => {
    if (!coffeeRef.current) return;
    coffeeRef.current.applyImpulse(
      new THREE.Vector3(-0.00000001, 0.00000015, 0),
      true,
    );
    coffeeRef.current.applyTorqueImpulse(
      new THREE.Vector3(0, 0.00000000002, 0.000000000003),
      true,
    );
  };

  return (
    <>
      <RigidBody
        ref={coffeeRef}
        colliders={"hull"}
        position={[positionX, positionY, positionZ + offset]}
        rotation={[rotationX, rotationY, rotationZ]}
      >
        <group {...props} dispose={null}>
          <mesh
            castShadow
            receiveShadow
            rotation-x={Math.PI * 0.5}
            geometry={nodes.cup.geometry}
            onClick={(e) => {
              e.stopPropagation();
              handleClick();
            }}
            onPointerEnter={() => (document.body.style.cursor = "pointer")}
            onPointerLeave={() => (document.body.style.cursor = "auto")}
          >
            <meshStandardMaterial
              map={texture}
              normalMap={textureNormal}
              metalness={0}
              roughness={1}
            />
          </mesh>
        </group>
      </RigidBody>
    </>
  );
}

useGLTF.preload("/coffee.glb");
