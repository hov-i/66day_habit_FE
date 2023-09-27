import React from "react";
import FirstHelp from "../components/Help/FirstHelp";
import Box from "../components/common/Box";
import styled from "styled-components";
import NextButton from "../components/common/NextButton";
import useViewport from "../util/viewportHook";
import SecondHelp from "../components/Help/SecondHelp";
import ThirdHelp from "../components/Help/ThirdHelp";
import FourthHelp from "../components/Help/FourthHelp";
const HelpPage = () => {
  const { isMobile } = useViewport();
  return (
    <>
      <Box>
        <FourthHelp />
        <NextClick isMobile={isMobile}>
          <NextButton disable={true} />
        </NextClick>
      </Box>
    </>
  );
};

const NextClick = styled.div<{ isMobile: boolean }>`
  position: fixed;
  bottom: 0;
  padding: 80px;
  padding-bottom: 180px;
  z-index: 1;
  display: flex;
  align-items: right;
  justify-content: right;
  width: ${({ isMobile }) => (isMobile ? "100%" : "768px")};
`;

export default HelpPage;
