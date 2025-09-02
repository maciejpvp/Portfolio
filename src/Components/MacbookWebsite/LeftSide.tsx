import { ProfilePicture } from "./ProfilePicture";
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { TbBrandMatrix } from "react-icons/tb";

export const LeftSideComponent = () => {
  const socialButtons = [
    { icon: <FaGithub />, label: "Github" },
    { icon: <FaLinkedin />, label: "LinkedIn" },
    { icon: <FaTelegram />, label: "Telegram" },
    { icon: <TbBrandMatrix />, label: "Matrix" },
  ];

  return (
    <div className="flex flex-col items-center gap-2">
      <ProfilePicture />
      <p>Hi, I`m Oskar</p>
      <div className="grid grid-cols-2 gap-x-0.5 gap-y-1">
        {socialButtons.map((btn) => (
          <button
            key={btn.label}
            className="bg-stone-900 text-stone-300 flex items-center gap-1 px-1 py-[1px] rounded hover:bg-[#afafaf] hover:scale-[1.01] transition-all duration-100"
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
