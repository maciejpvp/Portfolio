import styled from "styled-components";
import { ProfilePicture } from "./ProfilePicture";
import { FaGithub, FaTelegram, FaLinkedin } from "react-icons/fa";
import { TbBrandMatrix } from "react-icons/tb";

const StyledApp = styled.div`
  background-color: #2c2724;
  color: #e2d7d0;
  display: flex;
  flex-direction: row;
  padding: 30px 0 0 20px;
  gap: 50px;
  width: 400px;
  height: 265px;
  border-radius: 5px;
`;

const LeftSide = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const RightSide = styled.div`
  display: "flex";
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

export const App = () => {
  return (
    <StyledApp>
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
      <RightSide>
        <h1>About Me</h1>
      </RightSide>
    </StyledApp>
  );
};
