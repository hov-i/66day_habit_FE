import React from "react";
import styled from "styled-components";
import fourthImg from "../../resources/stepping.png";
import useViewport from "../../util/viewportHook";

const FourthHelp = () => {
  const { isMobile } = useViewport();

  return (
    <HelpStyle isMobile={isMobile}>
      <div className="imgBox">
        <img src={fourthImg} alt="목표 이미지" className="img" />
      </div>

      <div className="mainTitle">
        21일차는 뇌의 각인,
        <br />
        66일차는 몸의 각인
      </div>
      <div className="subTitle">
        이러한 고비들을 이겨내면,
        <br />
        결국에는 <strong>21일차</strong>에 ‘그래. 난 할 수 있어!’
        <br />
        라는 확신을 가지게 됩니다.
        <br />
        <br />
        이처럼 모든 사람들은 3일차, 7일차 14일차,
        <br />
        21일차의 과정과 유사한 경험을 하게 됩니다.
        <br />
        <br />
        <strong>21일차</strong>가 되면 <strong>뇌</strong>는 공부에게 항복을
        선언하고
        <br />
        공부의 열렬한 지지자가 되며,
        <br />
        <br />
        <strong>66일차</strong>에는 행동이 습관으로 자리잡아
        <br />
        <strong>몸</strong>이 학습하게 됩니다.
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
    padding-top: 10px;
  }
  .img {
    max-width: 40%; /* 최대 너비를 100%로 설정하여 반응형으로 만듭니다. */
    height: auto; /* 높이를 자동으로 조절하여 가로 세로 비율 유지 */
  }
  .mainTitle {
    font-size: 4vh;
    font-family: "Noto Sans Bold";
    padding: 50px;
    padding-bottom: 20px;
    padding-top: 0px;
    margin: 0px;
  }
  .subTitle {
    font-size: 2vh;
    padding: 50px;
    padding-top: 0px;
  }
`;

export default FourthHelp;
