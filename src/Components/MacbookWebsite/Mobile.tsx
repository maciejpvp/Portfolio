import { SocialButtonType } from "./LeftSide";
import { Projects } from "./Projects";
import { TechStack } from "./TechStack";
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FaSignalMessenger } from "react-icons/fa6";

export const Mobile = () => {
  const socialButtons: SocialButtonType[] = [
    {
      icon: <FaGithub />,
      label: "Github",
      url: "https://github.com/maciejpvp",
    },
    {
      icon: <FaLinkedin />,
      label: "LinkedIn",
      url: "https://github.com/maciejpvp",
    },
    {
      icon: <FaTelegram />,
      label: "Telegram",
      url: "https://t.me/yyupiiee",
    },
    {
      icon: <FaSignalMessenger />,
      label: "Signal",
      url: "https://signal.me/#eu/KQbS9gCgPDZHfKR5rm-6_DHgrhLi-KNdmSGRPYLC2yw9WsLm2IJLYKUyjTvvU-QS",
    },
  ];

  const handleOpenLink = (url: string) => {
    if (!url) return;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="w-screen bg-stone-900 text-stone-100 flex flex-col items-center p-4 gap-6 overflow-x-hidden overflow-y-scroll scroll-touch">
      <p className="text-xs">
        Its recommended to open this application on PC/Android
      </p>
      <div className="flex flex-col justify-center items-center">
        <h1 className="text-2xl">About Me</h1>
        <p className="text-center bg-stone-950 p-2 mt-1 rounded-lg w-[85%]">
          I am a full-stack developer specializing in
          <span className="font-semibold"> JavaScript</span> and
          <span className="font-semibold"> TypeScript</span>. With over
          <span className="font-semibold"> 3 years of experience</span>, I build
          scalable, efficient web applications and continuously refine my
          skills.
        </p>
      </div>
      <Projects ios={true} />
      <TechStack ios={true} />
      <div className="flex flex-col w-screen items-center">
        <h1 className="text-2xl">Contact</h1>
        <div className="grid grid-cols-2 gap-x-1 gap-y-1 w-full px-4 pl-5">
          {socialButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={() => handleOpenLink(btn.url)}
              className="bg-stone-950 text-stone-300 rounded-md cursor-pointer flex items-center gap-1 p-2 hover:bg-stone-950 hover:scale-[1.05] transition-all duration-100"
            >
              <span className="text-md flex flex-row items-center gap-2">
                {btn.icon}
                {btn.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
