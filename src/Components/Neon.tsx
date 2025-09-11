import React, { useRef } from "react";
import * as THREE from "three";
import { Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

interface NeonProps {
  text: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  color?: string;
  intensity?: number;
  size?: number;
}

const Neon: React.FC<NeonProps> = ({
  text,
  position = [0, 2, 0],
  rotation = [0, 0, 0],
  color = "#0ff",
  intensity = 5,
  size = 1,
}) => {
  const lightRef = useRef<THREE.RectAreaLight>(null!);

  // Optional flicker
  useFrame(({ clock }) => {
    if (lightRef.current) {
      lightRef.current.intensity =
        intensity + Math.sin(clock.elapsedTime * 10) * 0.2;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Text
        fontSize={size}
        color="#fff"
        anchorX="center"
        anchorY="middle"
        font={`${import.meta.env.BASE_URL}/fonts/Neon.otf`}
      >
        {text}
        <meshStandardMaterial
          color="#fff"
          emissive={new THREE.Color(color)}
          emissiveIntensity={3}
        />
      </Text>

      <rectAreaLight
        ref={lightRef}
        width={size * text.length * 0.6}
        height={size * 1.2}
        intensity={intensity}
        color={color}
        position={[0, 0, 0.1]}
        lookAt={[0, 0, -1]}
      />
    </group>
  );
};

export default Neon;
