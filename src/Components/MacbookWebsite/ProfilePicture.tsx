import ghost from "./pfp.jpg";

export const ProfilePicture = () => {
  return (
    <img
      src={ghost}
      alt="pfp"
      className="rounded-full border-4 border-stone-400 w-96"
    />
  );
};
