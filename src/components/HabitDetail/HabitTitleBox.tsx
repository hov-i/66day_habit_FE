import React from "react";
import styled from "styled-components";
import { ReactComponent as Back } from "../../resources/Icons/back.svg";
import { useNavigate } from "react-router-dom";
import useViewport from "../../util/viewportHook";
import { useRecoilValue } from "recoil";
import {
  habitIdState,
  memberHabitInfoState,
  memberIdState,
  userHabitInfoState,
} from "../../util/habitState";
import useHabitData from "../../util/habitInfoHook";
import useHabitColor from "../../util/habitcolorHook";
import { HabitInfo } from "../../util/types";

const HabitTitleBox = () => {
  const { isMobile } = useViewport();
  const userHabitInfoData = useRecoilValue(userHabitInfoState);
  const habitIdData = useRecoilValue(habitIdState);
  const selectId = useRecoilValue(memberIdState);
  const memberHabitInfoData = useRecoilValue(memberHabitInfoState);

  let HabitInfoValue: HabitInfo[] = [];
  if (selectId === 0) {
    HabitInfoValue = userHabitInfoData;
  } else if (selectId !== 0) {
    HabitInfoValue = memberHabitInfoData;
  }
  const { habitData } = useHabitData(HabitInfoValue, habitIdData);
  const { bgColorCode } = useHabitColor(habitData);

  const navigate = useNavigate();
  return (
    <>
      <TitleContainer
        isMobile={isMobile}
        progress={
          habitData?.habitDetail.progress ? habitData?.habitDetail.progress : 0
        }
      >
        <BackgroundBox
          backgroundUrl={bgColorCode ? bgColorCode : ""}
          fontColor={habitData?.fontColor ? habitData?.fontColor : "BLACK"}
        >
          <div className="backButton">
            <Back onClick={() => navigate(-1)} />
          </div>
          <div className="habitName">{habitData?.habitName}</div>
        </BackgroundBox>
        <div className="progress">
          진행도
          <div className="persentBox">
            <div className="persentBar" />
          </div>
          <span className="progress3Day">3</span>
          <span className="progress7Day">7</span>
          <span className="progress14Day">14</span>
          <span className="progress21Day">21</span>
        </div>
      </TitleContainer>
    </>
  );
};

const TitleContainer = styled.div<{ isMobile: boolean; progress: number }>`
  width: ${({ isMobile }) => (isMobile ? "100%" : "768px")};

  .progress {
    font-size: 16px;
    width: 85%;
    margin: 0 auto;
    margin-top: 20px;
  }

  .persentBox {
    width: 100%;
    background-color: #e8e8e8;
    height: 35px;
    border-radius: 6px;
    margin-top: 10px;
  }
  .persentBar {
    width: ${(props) => (props.progress ? `${props.progress}%` : "0%")};
    background-color: #363636;
    height: 35px;
    border-radius: 6px;
    margin-top: 10px;
  }
  .progress3Day {
    margin-left: 4.55%;
  }
  .progress7Day {
    margin-left: 6.06%;
  }
  .progress14Day {
    margin-left: 10.6%;
  }
  .progress21Day {
    margin-left: 10.61%;
  }
`;

const BackgroundBox = styled.div<{
  backgroundUrl: string;
  fontColor: string;
}>`
  width: 100%;
  height: 170px;
  background-image: ${(props) => props.backgroundUrl};
  background-size: cover;
  background-position: center;

  .backButton {
    padding: 30px;
    > svg {
      fill: ${(props) => (props.fontColor === "BLACK" ? "#363636" : "white")};
    }
  }

  .habitName {
    width: 85%;
    color: ${(props) => (props.fontColor === "BLACK" ? "#363636" : "white")};
    margin: 0 auto;
    margin-top: 20px;
    font-size: 32px;
    font-weight: bolder;
  }
`;

export default HabitTitleBox;
