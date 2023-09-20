import React, { ReactNode } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";

// 컴포넌트의 prop 타입 정의
interface BoxProps {
  children: ReactNode; // children은 ReactNode 타입으로 정의합니다.
}

const Box: React.FC<BoxProps> = ({ children }) => {
  const { isMobile } = useViewport();

  return (
    // isMobile prop을 BoxStyle로 전달합니다.
    <BoxStyle isMobile={isMobile}>{children}</BoxStyle>
  );
};

const BoxStyle = styled.div<{ isMobile: boolean }>`
  background-color: white;
  margin: 0 auto;
  width: ${(props) => (props.isMobile ? "100%" : "768px")};
  overflow: hidden;
  height: 100%;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default Box;
