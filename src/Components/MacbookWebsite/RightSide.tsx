import styled from "styled-components";

const RightSide = styled.div`
  display: "flex";
  text-align: center;
  // background-color: red;
`;

const AboutMeText = styled.p`
  font-size: 9px;
  text-align: left;
  background-color: oklch(14.5% 0 0);
  padding: 10px;
`;

export const RightSideComponent = () => {
  return (
    <RightSide>
      <h1>About Me</h1>
      <AboutMeText>
        I’m a full-stack developer specializing in JavaScript and TypeScript.
        With over 3 years of experience, I build scalable, efficient web
        applications and continuously refine my skills.
      </AboutMeText>
    </RightSide>
  );
};
