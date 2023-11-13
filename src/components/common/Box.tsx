import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { BoxProps } from "../../util/types";

const Box: React.FC<BoxProps> = ({ children }) => {
  const { isMobile } = useViewport();

  return <BoxStyle $isMobile={isMobile}>{children}</BoxStyle>;
};

const BoxStyle = styled.div<{ $isMobile: boolean }>`
  background-color: white;
  margin: 0 auto;
  height: 100%;
  width: ${(props) => (props.$isMobile ? "100%" : "768px")};
  overflow-x: hidden;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
`;

export default Box;
