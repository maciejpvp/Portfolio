import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import useCameraStore from "../../Utils/useCameraStore";
import { LeftSideComponent } from "./LeftSide";
import { RightSideComponent } from "./RightSide";

export const App = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const fullText = "> Open Portfolio...";
  const [waiting, setWaiting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCamera(2);
  };

  useEffect(() => {
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          // Typing forward
          if (index < fullText.length) {
            setText(fullText.slice(0, index + 1));
            setIndex(index + 1);
          } else {
            // Pause at full text before deleting
            setTimeout(() => setDeleting(true), 1000);
          }
        } else {
          // Deleting backwards
          if (index > 0) {
            setText(fullText.slice(0, index - 1));
            setIndex(index - 1);
          } else {
            // Start typing again
            setDeleting(false);
          }
        }
      },
      deleting ? 80 : 120,
    ); // Faster delete, slower type

    return () => clearTimeout(timeout);
  }, [index, deleting]);

  return (
    <div className="bg-stone-900 w-[1920px] h-[1200px] rounded overflow-hidden">
      <AnimatePresence>
        {!waiting ? (
          <div
            onClick={(e) => {
              handleClick(e);
              setWaiting(true);
            }}
            className="bg-stone-900 flex justify-center items-center w-[1920px] h-[1200px] rounded cursor-pointer"
          >
            <p className="text-[#e2d7d0] text-7xl font-mono tracking-wide">
              {text}
              <span className="animate-pulse">▋</span>
            </p>
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
