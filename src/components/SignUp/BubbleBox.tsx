import React from "react";
import styled, { css, keyframes } from "styled-components";
import { BubbleBoxProps } from "../../util/types";

const BubbleBox: React.FC<BubbleBoxProps> = ({
  children,
  name,
  buttonRef,
  type,
  userName,
  userImg,
  ani,
}) => {
  const bubbleClassName = name === "left" ? "bubble-left" : "bubble-right";

  return (
    <BubbleBoxStyle
      $name={name}
      ref={buttonRef}
      $type={type ? type : ""}
      $profileUrl={userImg ? userImg : ""}
      $ani={ani ? ani : false}
    >
      <div className={bubbleClassName}>
        {userName && (
          <>
            <div className="Img" />
            <div className="userName">{userName}</div>
          </>
        )}
        {children}
      </div>
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

const BubbleBoxStyle = styled.div<{
  $name: "left" | "right";
  $type: string;
  $profileUrl: string;
  $ani: boolean;
}>`
  width: 100%;
  padding-bottom: 0px;
  display: flex;
  align-items: center;
  justify-content: ${({ $name }) => $name};

  .bubble-right {
    position: relative;
    background: #e8e8e8;
    text-align: right;
    border-radius: ${(props) =>
      props.$type === "sign" ? "0.9em" : "50px 50px 0px 50px"};
    padding: ${(props) => (props.$type === "sign" ? "30px" : "20px")};
    font-size: 16px;
    color: black;
    margin: 30px;
    margin-top: 0px;

    opacity: ${(props) => (props.$type === "none" ? "1" : "0")};
    animation: ${(props) =>
      props.$type === "none"
        ? null
        : css`
            ${slideInFromRight} 0.5s ease-in-out forwards
          `};
    animation-delay: ${(props) => (props.$ani === true ? "0s" : "0.7s")};
    transition: 1.5s;
  }

  .bubble-left {
    position: relative;
    background: #363636;
    border-radius: ${(props) =>
      props.$type === "sign" ? "0.9em" : "50px 50px 50px 0px"};
    padding: ${(props) => (props.$type === "sign" ? "30px" : "20px")};
    font-size: 16px;
    color: white;
    align-items: right;
    margin: 30px;
    animation: ${(props) =>
      props.$type === "none"
        ? null
        : css`
            ${slideInFromLeft} 0.5s ease-in-out
          `};
    transition: 1.5s;
    .Img {
      width: 45px;
      height: 45px;
      border-radius: 50%;
      position: absolute;
      background-image: url(${(props) => props.$profileUrl});
      background-size: cover;
      background-position: center;
      bottom: 50px;
      left: 10px;
    }
    .userName {
      font-size: 14px;
      color: #363636;
      position: absolute;
      bottom: 65px;
      left: 60px;
      font-weight: bolder;
      width: 1000px;
    }
  }

  ${({ $type }) =>
    $type === "sign"
      ? css`
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
        `
      : ""}
`;

export default BubbleBox;
