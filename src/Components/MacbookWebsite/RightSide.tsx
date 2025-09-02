import { Projects } from "./Projects";

export const RightSideComponent = () => {
  return (
    <div className="flex flex-col text-center gap-1">
      <h1>About Me</h1>
      <p className="text-[9px] text-left bg-stone-900 p-2 mt-1 rounded-md">
        I’m a full-stack developer specializing in JavaScript and TypeScript.
        With over 3 years of experience, I build scalable, efficient web
        applications and continuously refine my skills.
      </p>
      <Projects />
    </div>
  );
};
