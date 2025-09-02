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
    <div className="flex flex-col items-center gap-2">
      <div className="flex flex-col items-center">
        <ProfilePicture />
        <p>Hi, I`m Oskar</p>
      </div>
      <div className="grid grid-cols-2 gap-x-0.5 gap-y-1">
        {socialButtons.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleOpenLink(btn.url)}
            className="bg-stone-900 text-stone-300 cursor-pointer flex items-center gap-1 px-1 py-[1px] rounded hover:bg-[#afafaf] hover:scale-[1.01] transition-all duration-100"
          >
            <span className="text-[8px] flex flex-row items-center gap-1">
              {btn.icon}
              {btn.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
