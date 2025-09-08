import { ProfilePicture } from "./ProfilePicture";
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { FaSignalMessenger } from "react-icons/fa6";

type SocialButtonType = {
  icon: React.ReactNode;
  label: string;
  url: string;
};

export const LeftSideComponent = () => {
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
    <div className="flex flex-col items-center gap-8 pt-24">
      <div className="flex flex-col items-center justify-center gap-4">
        <ProfilePicture />
        <p className="text-5xl">Hi, I`m Oskar</p>
      </div>
      <div className="grid grid-cols-2 gap-x-3 gap-y-3">
        {socialButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleOpenLink(btn.url)}
            className="bg-stone-900 text-stone-300 rounded-md cursor-pointer flex items-center gap-1 p-2 hover:bg-stone-950 hover:scale-[1.05] transition-all duration-100"
          >
            <span className="text-4xl flex flex-row items-center gap-2">
              {btn.icon}
              {btn.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
