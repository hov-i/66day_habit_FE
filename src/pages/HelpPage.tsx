import React, { useState } from "react";
import FirstHelp from "../components/Help/FirstHelp";
import SecondHelp from "../components/Help/SecondHelp";
import Box from "../components/common/Box";
import styled from "styled-components";
import NextButton from "../components/common/NextButton";
import useViewport from "../util/viewportHook";
import { useNavigate } from "react-router-dom";
import ThirdHelp from "../components/Help/ThirdHelp";
import FourthHelp from "../components/Help/FourthHelp";

const HelpPage = () => {
  const { isMobile } = useViewport();
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState<number>(0);

  const NextSlide = () => {
    if (currentSlide < TOTAL_SLIDES - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      navigate("/");
    }
  };

  const slides = [<SecondHelp />, <ThirdHelp />, <FourthHelp />, <FirstHelp />];
  return (
    <>
      <Box>
        <HiddenBox>
          <SliderContainer $currentSlide={currentSlide} $isMobile={isMobile}>
            {slides.map((slide, index) => (
              <Slide key={index}>{slide}</Slide>
            ))}
          </SliderContainer>
          <NextClick $isMobile={isMobile}>
            <NextButton disabled={false} onClick={NextSlide} />
          </NextClick>
        </HiddenBox>
      </Box>
    </>
  );
};

const TOTAL_SLIDES = 4;

const HiddenBox = styled.div`
  overflow: hidden;
`;

const SliderContainer = styled.div<{
  $currentSlide: number;
  $isMobile: boolean;
}>`
  position: relative;
  width: 100%;
  display: flex;
  transform: translateX(
    ${({ $currentSlide, $isMobile }) =>
      `-${$currentSlide * ($isMobile ? 100 : 768)}${$isMobile ? "%" : "px"}`}
  );
  transition: transform 0.5s ease-in-out;
`;

const Slide = styled.div`
  flex: 0 0 100%;
`;

const NextClick = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  bottom: 0;
  padding: 80px;
  padding-bottom: 180px;
  z-index: 1;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  width: ${(props) => (props.$isMobile ? "100%" : "768px")};
`;

export default HelpPage;
