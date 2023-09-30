import React from "react";
import styled from "styled-components";
import secondImg from "../../resources/checkBord.png";
import useViewport from "../../util/viewportHook";

const SecondHelp = () => {
  const { isMobile } = useViewport();

  return (
    <HelpStyle isMobile={isMobile}>
      <div className="imgBox">
        <img src={secondImg} alt="체크보드 이미지" className="img" />
      </div>

      <div className="mainTitle">
        행동이 습관이 되는
        <br />
        66일
      </div>
      <div className="subTitle">
        필리파 랠리 Phillippe Lally 교수 연구팀은
        <br />
        새로운 행동이 습관화되는 데는
        <br />
        최소 21일이 걸리며
        <br />
        <br />
        습관으로 자리 잡는 데는 66일이 걸린다는 <br />
        <strong>‘66일의 법칙’ </strong>을 발표했습니다.
      </div>
    </HelpStyle>
  );
};

const HelpStyle = styled.div<{ isMobile: boolean }>`
  height: 100vh;
  z-index: 99;
  .imgBox {
    width: 100%;
    align-items: center;
    justify-content: center;
    display: flex;

    padding-top: 70px;
  }
  .img {
    /* 이미지 크기 조절 */
    max-width: 55%; /* 최대 너비를 100%로 설정하여 반응형으로 만듭니다. */
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

export default SecondHelp;
