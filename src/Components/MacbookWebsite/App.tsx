import { MotionConfig } from "framer-motion";

import { Shell } from "./Shell";
import { useFocusLaptop } from "./useFocusLaptop";


export const App = () => {
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
          <Shell />
      </div>
    </MotionConfig>
  );
};

export default App;
