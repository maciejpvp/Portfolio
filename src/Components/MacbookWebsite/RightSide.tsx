import { Projects } from "./Projects";
import { TechStack } from "./TechStack";

export const RightSideComponent = () => {
  return (
    <div className="flex flex-col text-center gap-2 pt-24 px-24">
      <div className="h-full flex flex-col gap-10">
        <div className="flex flex-col gap-4 items-center">
          <h1 className="text-4xl">About Me</h1>
          <p className="text-3xl text-center bg-stone-900 p-2 mt-1 rounded-md w-[85%]">
            I am a full-stack developer specializing in
            <span className="font-semibold"> JavaScript</span> and
            <span className="font-semibold"> TypeScript</span>. With over
            <span className="font-semibold"> 3 years of experience</span>, I
            build scalable, efficient web applications and continuously refine
            my skills.
          </p>
        </div>
        <Projects />
        <TechStack />
      </div>
    </div>
  );
};
