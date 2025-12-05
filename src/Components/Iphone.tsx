import { useEffect, useState } from "react";
import { Html, useGLTF } from "@react-three/drei";
import { ThreeElements, ThreeEvent } from "@react-three/fiber";
import { folder, useControls } from "leva";
import * as THREE from "three";
import useCameraStore from "@/Utils/useCameraStore";
import { App } from "./IPhoneWebsite/App";
import { GLTF } from "three-stdlib";

type PrimitiveProps = Omit<ThreeElements["primitive"], "object">;

type GLTFResult = GLTF & {
  nodes: {
    Circle038: THREE.Mesh;
    Circle038_1: THREE.Mesh;
    Circle038_2: THREE.Mesh;
    Circle038_3: THREE.Mesh;
    Circle038_4: THREE.Mesh;
    AntennaLineBottom001: THREE.Mesh;
    AntennaLineTop001: THREE.Mesh;
    AppleLogo001: THREE.Mesh;
    BackCameraBottomGreyRing001: THREE.Mesh;
    BackCameraBottomLens001: THREE.Mesh;
    BackCameraP1001: THREE.Mesh;
    BackCameraTopGreyRing001: THREE.Mesh;
    BackCameraTopLens001: THREE.Mesh;
    CameraBump001: THREE.Mesh;
    FlashBG001: THREE.Mesh;
    FrontCameraContainer001: THREE.Mesh;
    FrontSpeakerBG001: THREE.Mesh;
    iPhoneLogo001: THREE.Mesh;
    MuteSwitch001: THREE.Mesh;
    Circle032: THREE.Mesh;
    Circle032_1: THREE.Mesh;
    Circle031: THREE.Mesh;
    Circle031_1: THREE.Mesh;
    SCREEN: THREE.Mesh;
    VolumeButtons001: THREE.Mesh;
  };
  materials: {
    ["FrameGrey.001"]: THREE.MeshStandardMaterial;
    ["Front.001"]: THREE.MeshStandardMaterial;
    ["Antennaline.001"]: THREE.MeshStandardMaterial;
    ["BackGrey.001"]: THREE.MeshStandardMaterial;
    ["Rubber.001"]: THREE.MeshStandardMaterial;
    ["AppleLogo.001"]: THREE.MeshStandardMaterial;
    ["BackCaneraGrayRIng.002"]: THREE.MeshStandardMaterial;
    ["Lens.001"]: THREE.MeshStandardMaterial;
    ["Black.015"]: THREE.MeshStandardMaterial;
    ["Frame.001"]: THREE.MeshStandardMaterial;
    ["PinkFlash.002"]: THREE.MeshStandardMaterial;
    ["FrontCameraBlack.002"]: THREE.MeshStandardMaterial;
    ["FrontSpeaker.001"]: THREE.MeshStandardMaterial;
    ["iPhoneLogo.001"]: THREE.MeshStandardMaterial;
    ["Black.014"]: THREE.MeshStandardMaterial;
    ["Display.002"]: THREE.MeshStandardMaterial;
  };
};

export const IPhone = (props: PrimitiveProps) => {
  const { nodes, materials } = useGLTF(
    `/iphone.gltf`,
  ) as unknown as GLTFResult;

  const [showScreen, setShowScreen] = useState<boolean>(false);

  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const { positionX, positionY, positionZ, scale } = useControls(
    "Iphone",
    {
      positionX: { value: -0.24, min: -0.315, max: -0.1, step: 0.001 },
      positionY: { value: 3.1925, min: 3, max: 4, step: 0.00001 },
      positionZ: { value: 0.03, min: 0.03, max: 0.04, step: 0.001 },
      scale: { value: 0.008, min: 0, max: 0.01, step: 0.001 },
    },
    { collapsed: true },
  );

  const htmlDbg = useControls(
    "HtmlIphone",
    {
      Position: folder(
        {
          positionX: { value: 0.175, min: -10, max: 10, step: 0.0001 },
          positionY: { value: -0.24, min: -1.015, max: 0, step: 0.0001 },
          positionZ: { value: 0.09, min: -10, max: 10, step: 0.0001 },
        },
        { collapsed: true },
      ),
      Rotation: folder(
        {
          rotationX: { value: 0, min: 0, max: Math.PI * 2, step: 0.001 },
          rotationY: { value: 0.0, min: 0, max: Math.PI * 2, step: 0.001 },
          rotationZ: { value: 0.0, min: 0, max: Math.PI * 2, step: 0.001 },
        },
        { collapsed: true },
      ),
      distanceFactor: { value: 1.56, min: 1, max: 2, step: 0.001 },
    },
    { collapsed: true },
  );

  useEffect(() => {
    setShowScreen(true);
  }, [showScreen]);

  return (
    <group
      {...props}
      dispose={null}
      position={[positionX, positionY, positionZ]}
      scale={scale}
      onClick={(e: ThreeEvent<MouseEvent>) => {
        e.stopPropagation();
        setSelectedCamera(4);
        document.body.style.cursor = "auto";
      }}
    >
      <group position={[0, 1.563, 0]}>
        <mesh
          geometry={nodes.Circle038.geometry}
          material={materials["FrameGrey.001"]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Circle038_1.geometry}
          material={materials["Front.001"]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Circle038_2.geometry}
          material={materials["Antennaline.001"]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Circle038_3.geometry}
          material={materials["BackGrey.001"]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.Circle038_4.geometry}
          material={materials["Rubber.001"]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.AntennaLineBottom001.geometry}
          material={materials["Antennaline.001"]}
          position={[0, -2.676, 0]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.AntennaLineTop001.geometry}
          material={materials["Antennaline.001"]}
          position={[0, 0.018, 0]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.AppleLogo001.geometry}
          material={materials["AppleLogo.001"]}
          position={[0.171, 0.521, -0.079]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.BackCameraBottomGreyRing001.geometry}
          material={materials["BackCaneraGrayRIng.002"]}
          position={[0.702, 0.884, -0.094]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.BackCameraBottomLens001.geometry}
          material={materials["Lens.001"]}
          position={[0.702, 0.884, -0.083]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.BackCameraP1001.geometry}
          material={materials["Black.015"]}
          position={[0.705, 1.027, -0.095]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.BackCameraTopGreyRing001.geometry}
          material={materials["BackCaneraGrayRIng.002"]}
          position={[0.702, 1.178, -0.094]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.BackCameraTopLens001.geometry}
          material={materials["Lens.001"]}
          position={[0.702, 1.178, -0.083]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.CameraBump001.geometry}
          material={materials["Frame.001"]}
          position={[0.704, 1.036, -0.079]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.FlashBG001.geometry}
          material={materials["PinkFlash.002"]}
          position={[0.705, 1.027, -0.093]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.FrontCameraContainer001.geometry}
          material={materials["FrontCameraBlack.002"]}
          position={[0.335, 1.323, 0.08]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.FrontSpeakerBG001.geometry}
          material={materials["FrontSpeaker.001"]}
          position={[0.156, 1.321, 0.077]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.iPhoneLogo001.geometry}
          material={materials["iPhoneLogo.001"]}
          position={[0.2, -1.175, -0.079]}
          castShadow
          receiveShadow
        />
        <mesh
          geometry={nodes.MuteSwitch001.geometry}
          material={materials["FrameGrey.001"]}
          position={[-0.65, 0.92, 0.009]}
          castShadow
          receiveShadow
        />
        <group position={[0.97, 0.562, -0.004]}>
          <mesh
            geometry={nodes.Circle032.geometry}
            material={materials["FrameGrey.001"]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Circle032_1.geometry}
            material={materials["Frame.001"]}
            castShadow
            receiveShadow
          />
        </group>
        <group position={[0.978, -0.043, 0]}>
          <mesh
            geometry={nodes.Circle031.geometry}
            material={materials["Black.014"]}
            castShadow
            receiveShadow
          />
          <mesh
            geometry={nodes.Circle031_1.geometry}
            material={materials["FrameGrey.001"]}
            castShadow
            receiveShadow
          />
        </group>
        <mesh
          geometry={nodes.SCREEN.geometry}
          material={new THREE.MeshBasicMaterial({ color: "black" })}
          castShadow
          receiveShadow
        />
        <Html
          transform
          scale={0.155}
          occlude={false}
          zIndexRange={[0, 1000]}
          position={[htmlDbg.positionX, htmlDbg.positionY, htmlDbg.positionZ]}
          rotation={[htmlDbg.rotationX, htmlDbg.rotationY, htmlDbg.rotationZ]}
          style={{
            zIndex: "100",
          }}
        >
          <div style={{ backfaceVisibility: "hidden" }}>
            <App />
          </div>
        </Html>
        <mesh
          geometry={nodes.VolumeButtons001.geometry}
          material={materials["FrameGrey.001"]}
          position={[-0.658, 0.208, -0.002]}
          castShadow
          receiveShadow
        />
      </group>
    </group>
  );
};

useGLTF.preload(`/iphone.gltf`);
