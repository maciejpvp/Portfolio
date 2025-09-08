import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCameraStore from "../../Utils/useCameraStore";
import { LeftSideComponent } from "./LeftSide";
import { RightSideComponent } from "./RightSide";

export const App = () => {
  const [waiting, setWaiting] = useState(false);
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCamera(2);
  };

  return (
    <div className="bg-stone-800 w-[1920px] h-[1200px] rounded overflow-hidden">
      <AnimatePresence>
        {!waiting ? (
          <div
            onClick={(e) => {
              handleClick(e);
              setWaiting(true);
            }}
            className="bg-stone-800 flex justify-center items-center gap-2 pt-6 px-4 text-[#e2d7d0] w-[1920px] h-[1200px] rounded"
          >
            {" "}
            <p className="text-9xl animate-bounce">Click Me...</p>{" "}
          </div>
        ) : (
          <motion.div
            key="main"
            onClick={handleClick}
            className="grid grid-cols-[30%_70%] gap-2 pt-6 px-4 text-[#e2d7d0] w-full h-full"
          >
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <LeftSideComponent />
            </motion.div>

            <motion.div
              initial={{ x: "100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeInOut" }}
            >
              <RightSideComponent />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
