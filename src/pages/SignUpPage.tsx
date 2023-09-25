import React, { useEffect, useRef, useState } from "react";
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

  const handleNextClick = () => {
    setStep(step + 1);
  };

  const bottom = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottom.current?.parentElement?.scrollTo(0, 10000);
  };

  useEffect(() => {
    scrollToBottom();
  }, [step]);

  return (
    <Box>
      <SignUpContainer isMobile={isMobile} step={step} ref={bottom}>
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
            <>
              <BubbleBox name="left">
                만나서 반가워요!
                <br /> 당신의 이름은 무엇인가요?
              </BubbleBox>
              <BubbleBox name="right">
                당신의 이름은?
                <input className="input" type="text" />
              </BubbleBox>
            </>
          )}

          {step >= 2 && (
            <>
              <BubbleBox name="left">
                정말 멋진 이름이네요!
                <br /> 당신을 한마디로 소개한다면?
              </BubbleBox>
              <BubbleBox name="right">
                당신의 자기소개는? <input className="input" type="text" />
              </BubbleBox>
            </>
          )}

          {step >= 3 && (
            <>
              <BubbleBox name="left">
                정말 멋져요!
                <br />
                우리.. 친해지고 싶은데
                <br />
                연락할 이메일 좀 알려줄 수 있을까요?
              </BubbleBox>
              <BubbleBox name="right">
                당신의 이메일은? <input className="input" type="email" />
              </BubbleBox>
            </>
          )}

          {step >= 4 && (
            <>
              <BubbleBox name="left">
                고마워요!
                <br />
                더 찐한 사이가 되고 싶은데
                <br />
                우리만의 비밀번호를 알려주세요!
              </BubbleBox>
              <BubbleBox name="right">
                당신의 비밀번호는? <input className="input" type="password" />
              </BubbleBox>
            </>
          )}
          {step >= 5 && (
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

const SignUpContainer = styled.div<{ isMobile: boolean; step: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  ::-webkit-scrollbar {
    display: none;
  }
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
    padding-top: 100px;
    padding-bottom: 100px;
    ::-webkit-scrollbar {
      display: none;
    }
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
    font-size: 16px;
    padding-left: 20px;
    text-align: right;
  }
`;

export default SignPage;
