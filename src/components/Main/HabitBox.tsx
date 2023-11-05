import React, { useState } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as More } from "../../resources/Icons/more.svg";
import Modal from "../common/Modal";
import HabitMore from "./HabitMore";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  habitIdState,
  memberHabitInfoState,
  userHabitInfoState,
} from "../../util/habitState";
import useHabitData from "../../util/habitInfoHook";
import useHabitColor from "../../util/habitcolorHook";
import { HabitBoxProps, HabitInfo } from "../../util/types";
import { useNavigate } from "react-router-dom";

const HabitBox: React.FC<HabitBoxProps> = ({ name, habitId }) => {
  const [moreModalOpen, setMoreModalOpen] = useState<boolean>(false);
  const userHabitInfoData = useRecoilValue(userHabitInfoState);
  const memberHabitInfoData = useRecoilValue(memberHabitInfoState);

  let HabitInfoValue: HabitInfo[] = [];
  if (name === "main") {
    HabitInfoValue = userHabitInfoData;
  } else if (name === "friend") {
    HabitInfoValue = memberHabitInfoData;
  }
  const { habitData } = useHabitData(HabitInfoValue, habitId);
  const { bgColorCode } = useHabitColor(habitData);
  const { isMobile } = useViewport();
  const setHabitIdData = useSetRecoilState(habitIdState);
  const navigate = useNavigate();

  const openMoreModal = () => {
    setMoreModalOpen(true);
  };

  const closeMoreModal = () => {
    setMoreModalOpen(false);
  };

  const handleBoxClick = () => {
    setHabitIdData(habitId ? habitId : 0);
    navigate("/habit/detail");
  };

  return (
    <>
      <TagList isMobile={isMobile}>
        {habitData
          ? habitData.habitTags?.map((tag, index) => (
              <span key={index} className="tag">
                #{tag}
              </span>
            ))
          : null}
      </TagList>
      <HabitBoxStyle
        onClick={handleBoxClick}
        isMobile={isMobile}
        bgColor={
          bgColorCode
            ? bgColorCode
            : "linear-gradient(to right, #868f96 0%, #596164 100%)"
        }
        fontColor={habitData ? habitData.fontColor : "BLACK"}
        bgPercent={habitData ? habitData.habitDetail.progress : 0}
      >
        {name === "main" && (
          <div className="editButton">
            <More
              onClick={(e) => {
                e.stopPropagation();
                openMoreModal();
              }}
            />
          </div>
        )}
        {(name === "commend" || name === "search") && (
          <>
            <div className="profileBox" />
            <p className="userName">이름</p>
          </>
        )}
        <div className="habitName">
          {habitData ? habitData.habitName : "null"}
        </div>
      </HabitBoxStyle>
      {moreModalOpen && (
        <Modal
          open={moreModalOpen}
          close={closeMoreModal}
          height="400px"
          name="이메일 수정"
        >
          <HabitMore habitId={habitId} />
        </Modal>
      )}
    </>
  );
};

const HabitBoxStyle = styled.div<{
  isMobile: boolean;
  bgColor: string;
  fontColor: string;
  bgPercent: number;
}>`
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.fontColor === "BLACK" ? "#363636" : "white")};
  width: 100%;
  height: ${(props) => (props.isMobile ? "95px" : "105px")};
  border-radius: 23px;
  background-color: #e8e8e8;
  background-image: ${(props) => (props.bgColor ? props.bgColor : "none")};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-size: ${(props) =>
    props.bgPercent ? `${props.bgPercent}%` : "0%"};
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
