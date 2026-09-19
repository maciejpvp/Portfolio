import { MotionConfig, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

import { Shell } from "./Shell";
import { useFocusLaptop } from "./useFocusLaptop";

const FULL_TEXT = "> Open Portfolio...";
const TYPE_MS = 120;
const DELETE_MS = 80;
const PAUSE_MS = 1000;

/**
 * The MacBook screen. A typewriter splash gates the site, then the tabbed shell.
 *
 * Everything here is authored into a fixed 1920x1191 DOM box that the 3D camera optically
 * shrinks — see the `--text-*` note in index.css for what that means for sizing.
 */
export const App = () => {
  const [open, setOpen] = useState(false);
  const focusLaptop = useFocusLaptop();

  return (
    // reducedMotion="user" must be applied inside the <Html> subtree: drei renders these
    // children into a separate React root, so React context does not cross the boundary
    // from the canvas side.
    <MotionConfig reducedMotion="user">
      <div
        {...focusLaptop}
        className="bg-background h-full w-full overflow-hidden rounded"
      >
        {open ? (
          <Shell />
        ) : (
          <Splash
            onOpen={() => {
              setOpen(true);
            }}
          />
        )}
      </div>
    </MotionConfig>
  );
};

const Splash = ({ onOpen }: { onOpen: () => void }) => {
  const reduceMotion = useReducedMotion();
  const [typed, setTyped] = useState(reduceMotion ? FULL_TEXT : "");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;

    const atEnd = !deleting && typed.length === FULL_TEXT.length;
    const atStart = deleting && typed.length === 0;

    const timeout = setTimeout(
      () => {
        if (atEnd) return setDeleting(true);
        if (atStart) return setDeleting(false);
        setTyped(FULL_TEXT.slice(0, typed.length + (deleting ? -1 : 1)));
      },
      atEnd ? PAUSE_MS : deleting ? DELETE_MS : TYPE_MS,
    );

    return () => clearTimeout(timeout);
  }, [typed, deleting, reduceMotion]);

  return (
    <button
      type="button"
      onClick={onOpen}
      // Keyboard visitors need a way in too; the old splash was a div with an onClick.
      className="focus-visible:ring-ring flex h-full w-full cursor-pointer flex-col items-center justify-center gap-10 focus-visible:ring-8 focus-visible:outline-none"
    >
      <p className="text-foreground font-mono text-7xl tracking-wide">
        {typed}
        <span className={reduceMotion ? undefined : "animate-pulse"}>▋</span>
      </p>
      <span className="text-label text-muted-foreground">
        Click anywhere to open
      </span>
    </button>
  );
};

export default App;
