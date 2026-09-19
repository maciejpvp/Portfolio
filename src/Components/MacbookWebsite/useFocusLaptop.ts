import type { MouseEvent, SyntheticEvent } from "react";

import useCameraStore from "../../Utils/useCameraStore";

/** The MacBook camera preset in `Utils/cameraPresets.ts`. */
const MACBOOK_PRESET = 2;

/**
 * Elements that must not move the camera when activated. Following a link — including
 * `mailto:` and the CV download — should not also yank the view.
 */
const KEEPS_CAMERA = "a[href], [data-keeps-camera]";

/**
 * Clicking the laptop screen focuses the camera on it. This has to live on the DOM side:
 * drei renders `<Html>` children into a separate React root mounted as a *sibling* of the
 * canvas, so screen clicks never reach the r3f `onClick` on the MacBook `<group>` and that
 * handler cannot do the job.
 *
 * r3f v9 connects its event handlers to the `<Canvas>` *wrapper div*, not to the canvas
 * element, so every pointer event on the screen still bubbles into the raycaster and gets
 * resolved against whatever mesh happens to sit under the cursor — the desk or the floor
 * once the camera has moved in, both of which reset the view to preset 0. That is why the
 * focus only held while the button was down. So these handlers stop propagation as well,
 * keeping screen interaction out of the 3D event system entirely.
 *
 * Spread the result onto the screen's root element.
 */
export const useFocusLaptop = () => {
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const stop = (event: SyntheticEvent) => {
    event.stopPropagation();
  };

  return {
    onPointerDown: stop,
    onPointerUp: stop,
    onClick: (event: MouseEvent) => {
      event.stopPropagation();

      const target = event.target;
      if (target instanceof Element && target.closest(KEEPS_CAMERA)) return;
      setSelectedCamera(MACBOOK_PRESET);
    },
  };
};
