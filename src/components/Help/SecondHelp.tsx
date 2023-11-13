import React from "react";
import styled from "styled-components";
import secondImg from "../../resources/checkBord.png";

const SecondHelp = () => {
  return (
    <HelpStyle>
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

const HelpStyle = styled.div`
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
    max-width: 40%;
    height: auto;
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
