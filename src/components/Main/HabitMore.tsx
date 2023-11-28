import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Delete } from "../../resources/Icons/delete.svg";
import { ReactComponent as Edit } from "../../resources/Icons/edit.svg";
import { ReactComponent as Check } from "../../resources/Icons/check.svg";
import { ReactComponent as NoneCheck } from "../../resources/Icons/noneCheck.svg";
import Perfect from "../../resources/100.png";
import Good from "../../resources/50.png";
import Soso from "../../resources/20.png";
import AxiosAPI from "../../api/AxiosAPI";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import {
  alarmMessageState,
  habitIdState,
  habitMessage,
  habitNameState,
} from "../../util/habitState";
import { HabitDetail, HabitMoreProps, StickerData } from "../../util/types";

const HabitMore: React.FC<HabitMoreProps> = ({ habitId }) => {
  const navigate = useNavigate();
  const [isSame, setIsSame] = useState<boolean>(false);
  const setHabitIdData = useSetRecoilState(habitIdState);
  const sethabitMessage = useSetRecoilState(habitMessage);
  const sethabitNameSate = useSetRecoilState(habitNameState);
  const setalarmMessageDataState = useSetRecoilState(alarmMessageState);
  const [habitDetailData, setHabitDetailData] = useState<HabitDetail>({
    habitName: "",
    progress: 0,
    achievementRates: {
      thirty: 0,
      fifty: 0,
      hundred: 0,
    },
    todayChecked: false,
  });
  const persentValue = habitDetailData?.progress || 0;
  const achievementRates = habitDetailData?.achievementRates || {};
  const entries = Object.entries(achievementRates);
  entries.sort((a, b) => b[1] - a[1]);
  const mainSticker = getSticker(achievementRates, entries[0][0]);
  const secondSticker = getSticker(achievementRates, entries[1][0]);
  const lastSticker = getSticker(achievementRates, entries[2][0]);

  useEffect(() => {
    if (habitId) {
      const getHabitMore = async () => {
        try {
          const response = await AxiosAPI.habitMore(habitId);
          if (response.status === 200) {
            setHabitDetailData(response.data.data);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getHabitMore();
    }
  });

  const handleDeleteClick = () => {
    console.log("삭제 클릭");
    const deleteHabit = async () => {
      try {
        const response = await AxiosAPI.habitDelete(habitId || 0);
        if (response.status === 200) {
          console.log("습관 삭제 성공");
          sethabitMessage("delete");
          sethabitNameSate(habitDetailData ? habitDetailData.habitName : "");
          setalarmMessageDataState((prevAlarmMessageDataState) =>
            prevAlarmMessageDataState.concat({
              Name: `${habitDetailData ? habitDetailData.habitName : ""}`,
              data: "delete",
            })
          );
          navigate("/main");
        }
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status === 403) {
          console.error(error);
        }
      }
    };
    deleteHabit();
  };

  const handleChangeClick = () => {
    setHabitIdData(habitId || 0);
    navigate("/habit/edit");
  };

  useEffect(() => {
    if (
      mainSticker.stickerText !== secondSticker.stickerText ||
      secondSticker.stickerText !== lastSticker.stickerText ||
      mainSticker.stickerText !== lastSticker.stickerText
    ) {
      setIsSame(false);
    } else {
      setIsSame(true);
    }
  }, [
    mainSticker.stickerText,
    secondSticker.stickerText,
    lastSticker.stickerText,
  ]);

  return (
    <>
      <MoreBox $progress={persentValue} $isSame={isSame}>
        <div className="title">
          {habitDetailData ? habitDetailData.habitName : ""}
          {habitDetailData ? (
            <>{habitDetailData.todayChecked ? <Check /> : <NoneCheck />}</>
          ) : (
            "null"
          )}
        </div>
        <div className="progress">
          <div className="sticker">
            {secondSticker.stickerImage}
            <div>{secondSticker.stickerText}%</div>
          </div>
          <div className="mainSticker">
            {mainSticker.stickerImage}
            <div>{mainSticker.stickerText}%</div>
          </div>
          <div className="sticker">
            {lastSticker.stickerImage}
            <div>{lastSticker.stickerText}%</div>
          </div>
        </div>
        <div className="graphBox">
          <div className="graphBar" />
        </div>
        <div className="persent">
          습관 만들기까지 {persentValue}% 진행됐어요!
        </div>
        <div className="button">
          <AlertContainer onClick={handleChangeClick}>
            <Edit />
            <div className="change">수정</div>
          </AlertContainer>
          <AlertContainer onClick={handleDeleteClick}>
            <Delete />
            <div className="delete">삭제</div>
          </AlertContainer>
        </div>
      </MoreBox>
    </>
  );
};

function getSticker(
  achievementRates: Record<string, number>,
  type: string
): StickerData {
  let stickerImage = null;
  let stickerText = null;

  if (achievementRates.hasOwnProperty(type)) {
    if (type === "thirty") {
      stickerImage = <img src={Soso} alt="20%" className="img" />;
      stickerText = achievementRates.thirty;
    } else if (type === "fifty") {
      stickerImage = <img src={Good} alt="50%" className="img" />;
      stickerText = achievementRates.fifty;
    } else if (type === "hundred") {
      stickerImage = <img src={Perfect} alt="100%" className="img" />;
      stickerText = achievementRates.hundred;
    }
  }

  return { stickerImage, stickerText };
}

const MoreBox = styled.div<{ $progress: number; $isSame: boolean }>`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  font-size: 16px;

  .title {
    font-size: 20px;
    margin-top: 20px;
    font-weight: bolder;
    align-items: center;
    justify-content: center;
    display: flex;
    margin-left: 10px;
    > svg {
      margin-left: 10px;
      margin-top: 3px;
    }
  }
  .graphBox {
    width: 75%;
    background-color: #e8e8e8;
    height: 10px;
    border-radius: 5px;
    margin-top: 30px;
  }
  .graphBar {
    width: ${(props) => (props.$progress ? `${props.$progress}%` : "0%")};
    background-color: #363636;
    height: 10px;
    border-radius: 5px;
  }
  .persent {
    width: 75%;
    text-align: right;
  }
  .progress {
    display: flex;
    width: 90%;
    margin-top: 20px;
    align-items: center;
    justify-content: center;
  }
  .sticker {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .mainSticker {
    font-weight: ${(props) => (props.$isSame ? "nomal" : "bolder")};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
    .img {
      max-width: ${(props) => (props.$isSame ? "40%" : "55%")};
      height: auto;
    }
  }
  .img {
    max-width: 40%;
    height: auto;
  }

  .button {
    display: flex;
    width: 75%;
    align-items: center;
    justify-content: right;
  }
`;

const AlertContainer = styled.div`
  padding: 8px;
  width: 100px;
  text-align: center;
  font-size: 16px;
  color: #363636;
  display: flex;
  align-items: center;
  justify-content: right;
  margin-top: 30px;
  background-color: white;
  cursor: pointer;

  .delete {
    color: red;
    margin-left: 8px;
  }
  .change {
    margin-left: 8px;
  }
`;

export default HabitMore;
