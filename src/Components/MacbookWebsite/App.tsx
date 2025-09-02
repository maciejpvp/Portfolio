import styled from "styled-components";
import useCameraStore from "../../Utils/useCameraStore";
import { LeftSideComponent } from "./LeftSide";
import { RightSideComponent } from "./RightSide";

const StyledApp = styled.div`
  background-color: oklch(20.5% 0 0);
  display: grid;
  grid-template-columns: 30% 70%;
  padding: 20px 5px;
  gap: 10px;
  color: #e2d7d0;
  width: 400px;
  height: 265px;
  border-radius: 5px;
`;

export const App = () => {
  const setSelectedCamera = useCameraStore((state) => state.setSelectedCamera);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedCamera(2);
  };

  return (
    <StyledApp onClick={handleClick}>
      <LeftSideComponent />
      <RightSideComponent />
    </StyledApp>
  );
};
