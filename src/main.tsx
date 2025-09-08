import { StrictMode, useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { motion, AnimatePresence } from "framer-motion";
import "./index.css";
import "./reset.css";
import { App } from "./App.tsx";

const Intro = ({ onFinish }: { onFinish: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000); // intro trwa 2 sekundy
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-stone-900 z-50 flex flex-col items-center justify-center gap-6">
      <p className="text-5xl text-[#e2d7d0]">Loading...</p>

      {/* Pasek ładowania */}
      <div className="w-64 h-2 bg-stone-700 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="h-full bg-[#e2d7d0]"
        />
      </div>
    </div>
  );
};

const RootApp = () => {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!introDone && (
          <Intro key="intro" onFinish={() => setIntroDone(true)} />
        )}
      </AnimatePresence>
      <div className="relative z-0">
        <App />
      </div>
    </>
  );
};

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>,
);
