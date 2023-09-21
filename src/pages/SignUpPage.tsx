import React, { useEffect, useState } from "react";
import Box from "../components/common/Box";
import styled from "styled-components";
import { ReactComponent as Back } from "../resources/Icons/back.svg";
import { Link } from "react-router-dom";
import BubbleBox from "../components/SignUp/BubbleBox";
import NextButton from "../components/common/NextButton";
import useViewport from "../util/viewportHook";

const SignPage = () => {
  const { isMobile } = useViewport();
  const [step, setStep] = useState(1);
  const [showStep, setShowStep] = useState(1); // 표시할 단계를 관리합니다.

  useEffect(() => {
    // 1초 뒤에 다음 단계를 표시합니다.
    const timer = setTimeout(() => {
      setShowStep(step);
    }, 1000);

    return () => {
      clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 클리어합니다.
    };
  }, [step]);

  const handleNextClick = () => {
    // 다음 단계로 이동하는 로직을 작성합니다.
    setStep((prevStep) => prevStep + 1);
  };
  return (
    <Box>
      <SignUpContainer isMobile={isMobile} showStep={showStep}>
        <div className="backButton">
          <Link to="/login">
            <Back />
          </Link>
        </div>
        <div className="nextClick" onClick={handleNextClick}>
          <NextButton />
        </div>

        <div className="container">
          {step >= 1 && (
            <BubbleBox name="left">
              만나서 반가워요!
              <br /> 당신의 이름은 무엇인가요?
            </BubbleBox>
          )}
          {showStep >= 2 && (
            <BubbleBox name="right">
              당신의 이름은?
              <input className="input" type="text" />
            </BubbleBox>
          )}
          {showStep >= 2 && (
            <BubbleBox name="left">
              정말 멋진 이름이네요!
              <br /> 당신을 한마디로 소개한다면?
            </BubbleBox>
          )}
          {showStep >= 2 && (
            <BubbleBox name="right">
              당신의 자기소개는? <input className="input" type="text" />
            </BubbleBox>
          )}
          {showStep >= 3 && (
            <BubbleBox name="left">
              정말 멋져요!
              <br />
              우리.. 친해지고 싶은데
              <br />
              연락할 이메일 좀 알려줄 수 있을까요?
            </BubbleBox>
          )}
          {showStep >= 4 && (
            <BubbleBox name="right">
              당신의 이메일은? <input className="input" type="email" />
            </BubbleBox>
          )}
          {step >= 4 && (
            <BubbleBox name="left">
              고마워요!
              <br />
              더 찐한 사이가 되고 싶은데
              <br />
              우리만의 비밀번호를 알려주세요!
            </BubbleBox>
          )}
          {showStep >= 5 && (
            <BubbleBox name="right">
              당신의 비밀번호는? <input className="input" type="password" />
            </BubbleBox>
          )}
          {showStep >= 6 && (
            <BubbleBox name="left">
              이제 준비가 다 되었어요!
              <br />
              멋진 습관을 만들러 가볼까요?
            </BubbleBox>
          )}
        </div>
      </SignUpContainer>
    </Box>
  );
};

const SignUpContainer = styled.div<{ isMobile: boolean; showStep: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${({ showStep }) => (showStep >= 3 ? "100%" : "100vh")};

  .nextClick {
    position: fixed;
    bottom: 0;
    padding: 50px;
    z-index: 1;
    display: flex;
    align-items: right;
    justify-content: right;
    width: ${({ isMobile }) => (isMobile ? "100%" : "768px")};
  }
  .container {
    padding: 30px;
    height: 100%;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .backButton {
    padding: 30px;
    position: fixed;
    z-index: 999;
  }

  .input {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background: transparent;
    font-size: 16px; // 원하는 글꼴 크기 설정
    padding-left: 20px;
    text-align: right;
  }
`;

export default SignPage;
