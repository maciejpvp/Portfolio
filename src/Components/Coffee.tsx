// import { useGLTF } from "@react-three/drei";
// import { ReactThreeFiber } from "@react-three/fiber";
// import { MeshCollider, RapierRigidBody, RigidBody } from "@react-three/rapier";
// import { useControls } from "leva";
// import { useRef } from "react";
// import * as THREE from "three";
//
// type PrimitiveProps = Omit<
//   ReactThreeFiber.Object3DNode<THREE.Object3D, typeof THREE.Object3D>,
//   "object"
// >;
//
// export const Coffee = (props: PrimitiveProps) => {
//   const coffeeRef = useRef<RapierRigidBody>(null!);
//   const { scene } = useGLTF("./coffee.glb");
//
//   const { positionX, positionY, positionZ } = useControls(
//     "Coffee",
//     {
//       positionX: { value: -0.175, min: -0.5, max: 0.5, step: 0.0001 },
//       positionY: { value: 3.195, min: 3, max: 4, step: 0.00001 },
//       positionZ: { value: 0, min: -1, max: 1, step: 0.001 },
//     },
//     { collapsed: true },
//   );
//
//   scene.children.forEach((mesh) => {
//     mesh.castShadow = true;
//   });
//
//   const handleClick = () => {
//     if (!coffeeRef.current) return;
//     const cup = coffeeRef.current;
//     cup.applyImpulse(new THREE.Vector3(0, 0.000000015, 0), true);
//     cup.applyTorqueImpulse(
//       new THREE.Vector3(0, 0.000000000001, 0.000000000002),
//       true,
//     );
//   };
//   return (
//     <RigidBody ref={coffeeRef} colliders={false}>
//       <MeshCollider type="trimesh">
//         <primitive
//           {...props}
//           object={scene}
//           onClick={handleClick}
//           position={[positionX, positionY, positionZ]}
//         />
//       </MeshCollider>
//     </RigidBody>
//   );
// };
import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { GLTF } from "three-stdlib";
import { RigidBody, MeshCollider, RapierRigidBody } from "@react-three/rapier";
import { useControls } from "leva";

// Define the structure of the GLTF model
interface GLTFResult extends GLTF {
  nodes: {
    cup: THREE.Mesh;
  };
  materials: {};
}

export function Coffee(props: JSX.IntrinsicElements["group"]) {
  const coffeeRef = useRef<RapierRigidBody>(null!);
  const { nodes } = useGLTF("/coffee.glb") as GLTFResult;

  // Leva controls for position adjustments
  const { positionX, positionY, positionZ } = useControls(
    "Coffee",
    {
      positionX: { value: -0.175, min: -0.5, max: 0.5, step: 0.0001 },
      positionY: { value: 3.195, min: 3, max: 4, step: 0.00001 },
      positionZ: { value: 0, min: -1, max: 1, step: 0.001 },
    },
    { collapsed: true },
  );

  // Click event to apply impulse and torque
  const handleClick = () => {
    if (!coffeeRef.current) return;
    coffeeRef.current.applyImpulse(new THREE.Vector3(0, 0.000000015, 0), true);
    coffeeRef.current.applyTorqueImpulse(
      new THREE.Vector3(0, 0.000000000001, 0.000000000002),
      true,
    );
  };

  return (
    <RigidBody ref={coffeeRef} colliders={false}>
      <MeshCollider type="trimesh">
        <group
          {...props}
          dispose={null}
          position={[positionX, positionY, positionZ]}
        >
          <mesh
            castShadow
            receiveShadow
            rotation-x={Math.PI * 0.5}
            geometry={nodes.cup.geometry}
            material={nodes.cup.material}
            onClick={handleClick}
          />
        </group>
      </MeshCollider>
    </RigidBody>
  );
}

useGLTF.preload("/coffee.glb");
