import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaReact, FaNodeJs, FaGit } from "react-icons/fa";
import { GiElectric } from "react-icons/gi";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiMongodb,
  SiExpress,
  SiAwsamplify,
  SiSqlite,
  SiDocker,
  SiFramer,
} from "react-icons/si";

type Tech = {
  name: string;
  icon: React.ReactNode;
  color?: string;
};

const techStack: Tech[] = [
  { name: "React", icon: <FaReact />, color: "#61DBFB" },
  { name: "React Three Fiber", icon: <SiFramer />, color: "#61DBFB" },
  { name: "Next.js", icon: <SiNextdotjs />, color: "#000000" },
  { name: "TypeScript", icon: <SiTypescript />, color: "#3178C6" },
  { name: "Node.js", icon: <FaNodeJs />, color: "#68A063" },
  { name: "Express.js", icon: <SiExpress />, color: "#000000" },
  { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "#38B2AC" },
  { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
  { name: "SQLite", icon: <SiSqlite />, color: "#003B57" },
  { name: "AWS CDK", icon: <SiAwsamplify />, color: "#FF9900" },
  { name: "Docker", icon: <SiDocker />, color: "#2496ED" },
  { name: "Git", icon: <FaGit />, color: "#F05032" },
  { name: "Socket.IO", icon: <GiElectric />, color: "#FFAA00" },
  { name: "Framer Motion", icon: <SiFramer />, color: "#0055FF" },
];

export const TechStack: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrame: number;

    const scroll = () => {
      if (containerRef.current && !isHovered) {
        containerRef.current.scrollLeft += 1; // adjust speed here
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth / 2
        ) {
          containerRef.current.scrollLeft = 0; // loop
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };

    scroll();

    return () => cancelAnimationFrame(animationFrame);
  }, [isHovered]);

  const duplicatedTechStack = [...techStack, ...techStack];

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <h1 className="text-5xl mb-4">Tech</h1>
      <div
        ref={containerRef}
        className="flex gap-6 overflow-hidden whitespace-nowrap w-full px-4"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {duplicatedTechStack.map((tech, index) => (
          <motion.div
            key={`${tech.name}-${index}`}
            className="flex flex-col items-center gap-2 text-center p-4 rounded-xl bg-white/10 backdrop-blur-md shadow-lg cursor-pointer"
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: (index % techStack.length) * 0.05,
              type: "spring",
              stiffness: 120,
            }}
          >
            <div style={{ color: tech.color, fontSize: "2.5rem" }}>
              {tech.icon}
            </div>
            <span className="text-sm font-semibold text-white">
              {tech.name}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
