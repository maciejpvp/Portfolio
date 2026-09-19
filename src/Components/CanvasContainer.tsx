import { Canvas, useThree } from "@react-three/fiber";
import { ComponentProps, ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";

type CanvasProps = Omit<ComponentProps<typeof Canvas>, "children">;

/** Framing the scene and the camera presets were authored against. */
const BASE_ASPECT = 16 / 9;
const BASE_FOV = 30;
/** Past this the wide-angle distortion costs more than the extra framing buys. */
const MAX_FOV = 75;

/**
 * drei misplaces <Html transform> when the canvas has an odd CSS pixel size
 * (pmndrs/drei#720), so the canvas is always sized to an even number of pixels.
 */
const toEven = (value: number) => Math.max(2, Math.round(value / 2) * 2);

/**
 * Keeps the *horizontal* framing constant. Viewports narrower than the authored
 * aspect widen the vertical FOV instead of cropping the desk off at the sides,
 * which is what made the scene unusable on a phone held in portrait.
 *
 * Both the WebGL meshes and drei's <Html transform> scale with
 * `projectionMatrix[5] * height / 2`, so changing the FOV moves them together and
 * cannot desync the screens from their HTML.
 */
const ResponsiveCamera = () => {
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);

  useEffect(() => {
    if (!(camera instanceof THREE.PerspectiveCamera)) return;
    if (!size.width || !size.height) return;

    const aspect = size.width / size.height;
    const fitted =
      2 *
      THREE.MathUtils.radToDeg(
        Math.atan(
          Math.tan(THREE.MathUtils.degToRad(BASE_FOV) / 2) *
            (BASE_ASPECT / aspect),
        ),
      );

    camera.aspect = aspect;
    camera.fov =
      aspect >= BASE_ASPECT ? BASE_FOV : Math.min(fitted, MAX_FOV);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, invalidate]);

  return null;
};

type Props = {
  canvasProps?: CanvasProps;
  children?: ReactNode;
};

/**
 * Replaces `@isaac_ua/drei-html-fix`'s CanvasWrapper. Same idea — round the canvas to an
 * even CSS pixel size so <Html transform> lands correctly — with three corrections:
 *
 *  - the rounding is actually even. The original `Math.round(w % 2 !== 0 ? w + 1 : w)`
 *    turns a fractional 1512.5 into 1514, i.e. 1.5px wider than the viewport.
 *  - the container is positioned, so drei's absolutely-positioned HTML wrapper anchors
 *    to the canvas rather than to the initial containing block.
 *  - the canvas mounts only once measured, instead of rendering one 0x0 frame first.
 */
export const CanvasContainer = ({ canvasProps, children }: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const measure = (width: number, height: number) =>
      setSize((current) => {
        const next = { width: toEven(width), height: toEven(height) };
        return current.width === next.width && current.height === next.height
          ? current
          : next;
      });

    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      measure(width, height);
    });
    observer.observe(node);

    const rect = node.getBoundingClientRect();
    measure(rect.width, rect.height);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: "relative",
        width: "100%",
        height: "100dvh",
        overflow: "hidden",
      }}
    >
      {size.width > 0 && size.height > 0 && (
        <Canvas
          {...canvasProps}
          style={{
            ...canvasProps?.style,
            width: size.width,
            height: size.height,
          }}
        >
          <ResponsiveCamera />
          {children}
        </Canvas>
      )}
    </div>
  );
};
