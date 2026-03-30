import ghost from "./pfp.webp";

export const ProfilePicture = () => {
  return (
    <img
      src={ghost}
      alt="pfp"
      className="rounded-full w-96 h-96 object-cover border-4 border-stone-400"
    />
  );
};
