import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as More } from "../../resources/Icons/more.svg";

interface HabitBoxProps {
  name: "main" | "commend" | "friend" | "search";
}

const HabitBox: React.FC<HabitBoxProps> = ({ name }) => {
  const { isMobile } = useViewport();
  return (
    <>
      <TagList isMobile={isMobile}>
        <span className="tag">#태그</span> <span className="tag">#태그</span>{" "}
        <span className="tag">#태그</span> <span className="tag">#태그</span>{" "}
        <span className="tag">#태그</span>
      </TagList>
      <HabitBoxStyle isMobile={isMobile}>
        {name === "main" && (
          <div className="editButton">
            <More />
          </div>
        )}
        {(name === "commend" || name === "search") && (
          <>
            <div className="profileBox" />
            <p className="userName">이름</p>
          </>
        )}
        <div className="habitName">습관이름</div>
      </HabitBoxStyle>
    </>
  );
};

const HabitBoxStyle = styled.div<{ isMobile: boolean }>`
  cursor: pointer;
  position: relative;
  color: #363636;
  width: 100%;
  height: ${(props) => (props.isMobile ? "95px" : "105px")};
  border-radius: 23px;
  background-image: linear-gradient(135deg, #ec8f8c 0%, #ec8f8c 100%);
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-size: 50%;
  background-position: left;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  .profileBox {
    position: absolute;
    border-radius: 50%;
    background-color: #d9d9d9;
    width: 80px;
    height: 80px;
    bottom: 65px;
    left: 20px;
  }
  .userName {
    position: absolute;
    bottom: 90px;
    left: 105px;
    font-size: 18px;
    font-weight: bold;
  }
  .habitName {
    text-align: center;
    font-size: 20px;
    font-weight: bold;
  }

  .editButton {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;

const TagList = styled.p<{ isMobile: boolean }>`
  width: 100%;
  text-align: right;
  margin: 0;
  margin-top: 30px;
  font-size: 16px;
  margin-bottom: 10px;

  .tag {
    margin-right: 10px;
  }
`;

export default HabitBox;
