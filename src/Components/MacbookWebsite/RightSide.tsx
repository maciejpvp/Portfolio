import { Projects } from "./Projects";

export const RightSideComponent = () => {
  return (
    <div className="flex flex-col text-center gap-2 py-10 px-24">
      <div className="h-full flex flex-col gap-10">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">About Me</h1>
          <p className="text-3xl text-left bg-stone-900 p-2 mt-1 rounded-md">
            I am a full-stack developer specializing in JavaScript and
            TypeScript. With over 3 years of experience, I build scalable,
            efficient web applications and continuously refine my skills.
          </p>
        </div>
        <Projects />
      </div>
    </div>
  );
};
