import styled from "styled-components";
import { ProfilePicture } from "./ProfilePicture";
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { TbBrandMatrix } from "react-icons/tb";

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  // background-color: blue;
`;

const SocialList = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 2px;
  row-gap: 5px;
`;

const SocialButton = styled.button`
  background-color: #c2c0be;
  display: flex;
  align-items: center;
  gap: 5px;
  color: black;
  border: none;
  border-radius: 3px;
  font-size: 8px;
  transition: all 100ms;
  &:hover {
    background-color: #afafaf;
    scale: 101%;
  }
`;

export const LeftSideComponent = () => {
  return (
    <LeftSide>
      <ProfilePicture />
      <p>Hi, I`m Oskar</p>
      <SocialList>
        <SocialButton>
          <FaGithub />
          Github
        </SocialButton>
        <SocialButton>
          <FaLinkedin />
          LinkedIn
        </SocialButton>
        <SocialButton>
          <FaTelegram />
          Telegram
        </SocialButton>
        <SocialButton>
          <TbBrandMatrix />
          Matrix
        </SocialButton>
      </SocialList>
    </LeftSide>
  );
};
