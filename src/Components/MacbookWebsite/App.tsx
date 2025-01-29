import { useState } from "react";
import styled from "styled-components";

const StyledApp = styled.div`
  background-color: white;
  width: 400px;
  height: 260px;
  border-radius: 5px;
`;

export const App = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <StyledApp>
      <p>TEST</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Click</button>
    </StyledApp>
  );
};
