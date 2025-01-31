import * as THREE from "three";
import { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RigidBody, MeshCollider, RapierRigidBody } from "@react-three/rapier";
import { folder, useControls } from "leva";

// Define the structure of the GLTF model
interface GLTFResult extends GLTF {
  nodes: {
    cup: THREE.Mesh;
  };
  //eslint-disable-next-line
  materials: {};
}

export function Coffee(props: JSX.IntrinsicElements["group"]) {
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
          positionX: { value: -0.2, min: -1, max: 0, step: 0.0001 },
          positionY: { value: 3.195, min: 3, max: 4, step: 0.00001 },
          positionZ: { value: -0.06, min: -0.2, max: 0.2, step: 0.001 },
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
      new THREE.Vector3(-0.000000001, 0.000000015, 0),
      true,
    );
    coffeeRef.current.applyTorqueImpulse(
      new THREE.Vector3(0, 0.000000000002, 0.000000000003),
      true,
    );
  };

  return (
    <RigidBody ref={coffeeRef} colliders={false}>
      <MeshCollider type="trimesh">
        <group
          {...props}
          dispose={null}
          // position={[positionX, positionY, positionZ]}
          rotation={[rotationX, rotationY, rotationZ]}
        >
          <mesh
            castShadow
            receiveShadow
            rotation-x={Math.PI * 0.5}
            geometry={nodes.cup.geometry}
            onClick={handleClick}
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
      </MeshCollider>
    </RigidBody>
  );
}

useGLTF.preload("/coffee.glb");
