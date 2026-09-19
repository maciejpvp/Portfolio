import * as THREE from "three";

/**
 * drei's <Html transform> renders the element at
 *   worldSize = domPx * worldScale / (400 / (distanceFactor ?? 10))
 * so with `distanceFactor` left undefined the divisor is a constant 40.
 * See getObjectCSSMatrix in node_modules/@react-three/drei/web/Html.js.
 */
export const HTML_TRANSFORM_FACTOR = 40;

type Axis = "x" | "y" | "z";

export type ScreenFitOptions = {
  /** Width in CSS px of the DOM box handed to <Html>. Keep it well under the smallest viewport. */
  boxWidth: number;
  /** Local axis of the screen quad that maps to the DOM box's width. */
  widthAxis: Axis;
  /** Local axis of the screen quad that maps to the DOM box's height. */
  heightAxis: Axis;
  /** Local axis the screen faces along. */
  normalAxis: Axis;
  /** Signed nudge along `normalAxis`, in local units, to keep the DOM off the glass. */
  normalOffset?: number;
};

export type ScreenFit = {
  position: [number, number, number];
  scale: number;
  /** Height the DOM box needs so it matches the screen's aspect exactly. */
  boxHeight: number;
};

/**
 * Derives the <Html transform> position and scale that lay a DOM box `boxWidth` CSS px
 * wide exactly over a screen mesh, from that mesh's own geometry — so the placement
 * follows the model instead of hand-tuned constants.
 *
 * `geometry` must be expressed in the same local space the <Html> sits in, i.e. the
 * <Html> has to be a child of that mesh (or a sibling that shares its transform).
 */
export function fitScreen(
  geometry: THREE.BufferGeometry,
  {
    boxWidth,
    widthAxis,
    heightAxis,
    normalAxis,
    normalOffset = 0,
  }: ScreenFitOptions,
): ScreenFit {
  geometry.computeBoundingBox();
  const box = geometry.boundingBox!;
  const size = box.getSize(new THREE.Vector3());
  const center = box.getCenter(new THREE.Vector3());
  center[normalAxis] += normalOffset;

  const width = size[widthAxis];
  const height = size[heightAxis];

  return {
    position: [center.x, center.y, center.z],
    scale: (width * HTML_TRANSFORM_FACTOR) / boxWidth,
    boxHeight: Math.round((boxWidth * height) / width),
  };
}
