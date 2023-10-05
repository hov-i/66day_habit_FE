import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as More } from "../../resources/Icons/more.svg";

const HabitBox = () => {
  const { isMobile } = useViewport();
  return (
    <>
      <TagList isMobile={isMobile}>
        <span className="tag">#태그</span> <span className="tag">#태그</span>{" "}
        <span className="tag">#태그</span> <span className="tag">#태그</span>{" "}
        <span className="tag">#태그</span>
      </TagList>
      <HabitBoxStyle isMobile={isMobile}>
        <div className="editButton">
          <More />
        </div>
        <div className="habitName">습관이름</div>
      </HabitBoxStyle>
    </>
  );
};

const HabitBoxStyle = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: ${(props) => (props.isMobile ? "85%" : "80%")};
  height: ${(props) => (props.isMobile ? "95px" : "105px")};

  border-radius: 23px;
  border: 1px solid #000;
  background-image: url("https://i.ibb.co/G34b3m7/66day-Icon.png");
  background-size: 78%;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  .habitName {
    text-align: center;
    font-size: 20px;
    font-weight: bolder;
  }

  .editButton {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;

const TagList = styled.p<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "85%" : "80%")};
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
