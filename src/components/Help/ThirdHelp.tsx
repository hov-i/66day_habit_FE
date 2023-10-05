import React from "react";
import styled from "styled-components";
import ThirdImg from "../../resources/calendar.png";
import useViewport from "../../util/viewportHook";

const ThirdHelp = () => {
  const { isMobile } = useViewport();

  return (
    <HelpStyle isMobile={isMobile}>
      <div className="mainTitle">
        3, 7, 14일차에
        <br />
        오는 고비들
      </div>
      <div className="subTitle">
        만약 공부를 시작한다면 <strong>3일차</strong>가 되었을 때<br />
        ‘내가 과연 공부를 잘할 수 있을까?’
        <br />
        하는 <strong>1차 고비가</strong> 옵니다. <br />
        <br />이 고비를 넘기고 <strong>7일차가</strong> 되면
        <br />
        ‘내가 제대로 공부를 하고 있는가?’ 라는
        <br />
        의문이 생기며 <strong>2차 고비</strong>가 옵니다.
        <br />
        <br />이 고비를 극복하면 시간이 흘러 <strong>14일차</strong>에<br />
        ‘공부해서 성적이 올라갈까?’하는
        <br />
        <strong>3차 고비</strong>를 만나게 됩니다.
      </div>
      <div className="imgBox">
        <img src={ThirdImg} alt="달력 이미지" className="img" />
      </div>
    </HelpStyle>
  );
};

const HelpStyle = styled.div<{ isMobile: boolean }>`
  height: 100vh;
  .imgBox {
    width: 100%;
    align-items: right;
    justify-content: right;
    display: flex;
  }
  .img {
    /* 이미지 크기 조절 */
    max-width: 45%; /* 최대 너비를 100%로 설정하여 반응형으로 만듭니다. */
    height: auto; /* 높이를 자동으로 조절하여 가로 세로 비율 유지 */
  }
  .mainTitle {
    font-size: 4vh;
    font-family: "Noto Sans Bold";
    padding: 50px;
    padding-bottom: 20px;
    padding-top: 100px;
  }
  .subTitle {
    font-size: 2vh;
    padding: 50px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
`;

export default ThirdHelp;
