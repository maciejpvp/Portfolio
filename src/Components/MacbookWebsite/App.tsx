import styled from "styled-components";
import { ProfilePicture } from "./ProfilePicture";

const StyledApp = styled.div`
  background-color: #2c2724;
  color: #e2d7d0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 265px;
  border-radius: 5px;
`;

export const App = () => {
  return (
    <StyledApp>
      <ProfilePicture />
      <p>Hi,</p>
    </StyledApp>
  );
};
