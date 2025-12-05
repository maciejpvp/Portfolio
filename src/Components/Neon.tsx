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

const FLICKER_PROBABILITY = 0.8; // High chance a flicker happens
const FLICKER_INTERVAL_MIN = 1; // Check for flicker every 1-3s
const FLICKER_INTERVAL_MAX = 3;
const SHORT_FLICKER_DURATION_MIN = 0.05; // Very short flicker (50ms)
const SHORT_FLICKER_DURATION_MAX = 0.15;
const LONG_FLICKER_DURATION_MIN = 0.1; // Long flickers less common, short duration
const LONG_FLICKER_DURATION_MAX = 0.2;
const SHORT_FLICKER_INTENSITY_MIN = 0.4; // Intensity drops to 40-70% (rarely black)
const SHORT_FLICKER_INTENSITY_MAX = 0.7;
const LONG_FLICKER_INTENSITY_MIN = 0.1; // Occasional slightly darker flickers
const LONG_FLICKER_INTENSITY_MAX = 0.3;
const INTERPOLATION_SPEED = 0.5; // Faster interpolation for snappier flicker

const Neon: React.FC<NeonProps> = ({
  text,
  position = [0, 2, 0],
  rotation = [0, 0, 0],
  color = "#0ff",
  intensity = 5,
  size = 1,
}) => {
  const lightRef = useRef<THREE.RectAreaLight>(null!);
  const materialRef = useRef<THREE.MeshStandardMaterial>(null!);

  const flickerRef = useRef({
    nextFlicker:
      FLICKER_INTERVAL_MIN +
      Math.random() * (FLICKER_INTERVAL_MAX - FLICKER_INTERVAL_MIN),
    timer: 0,
    targetIntensity: intensity,
  });

  useFrame((_state, delta) => {
    const flicker = flickerRef.current;
    flicker.timer += delta;

    if (flicker.timer >= flicker.nextFlicker) {
      if (Math.random() < FLICKER_PROBABILITY) {
        const isShort = Math.random() < 0.9;
        if (isShort) {
          flicker.targetIntensity =
            intensity *
            (SHORT_FLICKER_INTENSITY_MIN +
              Math.random() *
              (SHORT_FLICKER_INTENSITY_MAX - SHORT_FLICKER_INTENSITY_MIN));
          flicker.nextFlicker =
            SHORT_FLICKER_DURATION_MIN +
            Math.random() *
            (SHORT_FLICKER_DURATION_MAX - SHORT_FLICKER_DURATION_MIN);
        } else {
          flicker.targetIntensity =
            intensity *
            (LONG_FLICKER_INTENSITY_MIN +
              Math.random() *
              (LONG_FLICKER_INTENSITY_MAX - LONG_FLICKER_INTENSITY_MIN));
          flicker.nextFlicker =
            LONG_FLICKER_DURATION_MIN +
            Math.random() *
            (LONG_FLICKER_DURATION_MAX - LONG_FLICKER_DURATION_MAX);
        }
      } else {
        flicker.targetIntensity = intensity; // No flicker
        flicker.nextFlicker =
          FLICKER_INTERVAL_MIN +
          Math.random() * (FLICKER_INTERVAL_MAX - FLICKER_INTERVAL_MIN);
      }
      flicker.timer = 0;
    }

    if (materialRef.current) {
      materialRef.current.emissive.lerp(
        new THREE.Color(color),
        INTERPOLATION_SPEED,
      );
      materialRef.current.emissiveIntensity = THREE.MathUtils.lerp(
        materialRef.current.emissiveIntensity,
        flicker.targetIntensity / 2,
        INTERPOLATION_SPEED,
      );
    }

    if (lightRef.current) {
      lightRef.current.intensity = THREE.MathUtils.lerp(
        lightRef.current.intensity,
        flicker.targetIntensity,
        INTERPOLATION_SPEED,
      );
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <Text
        fontSize={size}
        anchorX="center"
        anchorY="middle"
        font={`/fonts/Neon.otf`}
      >
        {text}
        <meshStandardMaterial
          ref={materialRef}
          color="#fff"
          emissive={new THREE.Color(color)}
          emissiveIntensity={intensity / 2}
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
