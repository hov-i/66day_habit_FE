import React from "react";
import styled from "styled-components";
import FirstHelp from "../../resources/66dayIcon.png";

const ThirdHelp = () => {
  return (
    <HelpStyle>
      <div className="mainTitle">
        당신과 함께하는
        <br />
        66일 습관 플랫폼
      </div>
      <div className="subTitle">
        그러나 66일 동안 꾸준히
        <br />
        같은 일을 하기는 <strong>어려울 수</strong> 있습니다.
        <br />
        <br />
        우리 66일 습관 서비스는
        <br />이 어려움을 <strong>극복</strong>하고 당신을 도와줍니다.
        <br />
        <br />이 서비스는 당신을 <strong>동기부여</strong>하고
        <br />
        습관을 <strong>기록</strong>하며 다른 사람들과
        <br />
        <strong>공유</strong>할 수 있는 플랫폼을 제공합니다.
        <br />
        <br />
        지금 당장 저희와 함께
        <br />
        <strong>멋진 습관</strong>을 만들러 가볼까요?
      </div>
      <div className="imgBox">
        <img src={FirstHelp} alt="66일 아이콘" className="img" />
      </div>
    </HelpStyle>
  );
};

const HelpStyle = styled.div`
  height: 100vh;
  .imgBox {
    width: 100%;
    align-items: right;
    justify-content: right;
    display: flex;
  }
  .img {
    max-width: 40%;
    height: auto;
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
