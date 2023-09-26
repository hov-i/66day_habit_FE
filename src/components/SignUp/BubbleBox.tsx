import React, { ReactNode } from "react";
import styled, { keyframes } from "styled-components";

// 컴포넌트의 prop 타입 정의
interface BubbleBoxProps {
  children: ReactNode;
  name: "left" | "right";
  buttonRef?: React.MutableRefObject<HTMLDivElement | null>;
}

const BubbleBox: React.FC<BubbleBoxProps> = ({ children, name, buttonRef }) => {
  const bubbleClassName = name === "left" ? "bubble-left" : "bubble-right";

  return (
    <BubbleBoxStyle name={name} ref={buttonRef}>
      <div className={bubbleClassName}>{children}</div>
    </BubbleBoxStyle>
  );
};

const slideInFromRight = keyframes`
  0% {
    transform: translateX(100%);
  }
  70%{
    transform: translateX(0);
  }
  80%{
    transform: translateX(2%);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`;

const slideInFromLeft = keyframes`
  0% {
    transform: translateX(-100%);
  }
  70%{
    transform: translateX(0);
  }
  80%{
    transform: translateX(-2%);
  }
  100% {
    transform: translateX(0);
  }
`;

const BubbleBoxStyle = styled.div<{ name: "left" | "right" }>`
  width: 100%;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: ${({ name }) => name};

  .bubble-right {
    position: relative;
    background: #e8e8e8;
    text-align: right;
    border-radius: 0.9em;
    padding: 30px;
    font-size: 16px;
    color: black;
    margin: 30px;
    margin-top: 0px;
    opacity: 0;
    animation: ${slideInFromRight} 0.5s ease-in-out forwards;
    animation-delay: 0.7s;
    transition: 1.5s;
  }

  .bubble-left {
    position: relative;
    background: #363636;
    border-radius: 0.9em;
    padding: 30px;
    font-size: 16px;
    color: white;
    align-items: right;
    animation: ${slideInFromLeft} 0.5s ease-in-out;
    transition: 1.5s;
  }

  .bubble-left:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 15%;
    width: 0;
    height: 0;
    border: 32px solid transparent;
    border-top-color: #363636;
    border-bottom: 0;
    border-left: 0;
    margin-left: -16px;
    margin-bottom: -32px;
  }

  .bubble-right:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 85%;
    width: 0;
    height: 0;
    border: 32px solid transparent;
    border-top-color: #e8e8e8;
    border-bottom: 0;
    border-right: 0;
    margin-left: -16px;
    margin-bottom: -32px;
  }
`;

export default BubbleBox;
