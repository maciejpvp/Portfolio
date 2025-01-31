import { useState } from "react";
import styled from "styled-components";

const StyledApp = styled.div`
  background-color: white;
  display: flex;
  fiex-direction: column;
  justify-content: center;
  align-items: center;
  width: 400px;
  height: 260px;
  border-radius: 5px;
`;

export const App = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <StyledApp>
      <p>I use Arch (BTW)</p>
      <p>Count: {count}</p>
      <button onClick={() => setCount((prev) => prev + 1)}>Click</button>
    </StyledApp>
  );
};
