import styled from "styled-components";
import ghost from "./ghost.png";

const BackgroundColor = styled.div`
  background-color: #d88ad8;
  border-radius: 50%;
  width: 90px;
`;
const Image = styled.img`
  scale: 0.7;
`;

export const ProfilePicture = () => {
  return (
    <BackgroundColor>
      <Image src={ghost} alt="ghost" />
    </BackgroundColor>
  );
};
