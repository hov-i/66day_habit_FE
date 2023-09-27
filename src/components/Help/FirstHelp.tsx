import React from "react";
import styled from "styled-components";
import firstImg from "../../resources/66dayIcon.png";
import useViewport from "../../util/viewportHook";

const FirstHelp = () => {
  const { isMobile } = useViewport();

  return (
    <HelpStyle isMobile={isMobile}>
      <img src={firstImg} alt="66일 아이콘" className="img" />
      <div className="mainTitle">
        기적을 보여주는
        <br />
        매일의 힘<br />
        66일의 기적
      </div>
      <div className="subTitle">당신만의 습관을 만들어보세요</div>
    </HelpStyle>
  );
};

const HelpStyle = styled.div<{ isMobile: boolean }>`
  height: 100vh;
  .img {
    /* 이미지 크기 조절 */
    max-width: 80%; /* 최대 너비를 100%로 설정하여 반응형으로 만듭니다. */
    height: auto; /* 높이를 자동으로 조절하여 가로 세로 비율 유지 */
  }
  .mainTitle {
    font-size: 4vh;
    font-family: "Noto Sans Bold";
    padding: 50px;
    padding-bottom: 20px;
  }
  .subTitle {
    font-size: 2vh;
    padding: 50px;
    padding-top: 0px;
  }
`;

export default FirstHelp;
