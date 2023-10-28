import React from "react";
import styled from "styled-components";
import { ReactComponent as Delete } from "../../resources/Icons/delete.svg";
import { ReactComponent as Edit } from "../../resources/Icons/edit.svg";
import { ReactComponent as Check } from "../../resources/Icons/check.svg";
import Perfect from "../../resources/100.png";
import Good from "../../resources/50.png";
import Soso from "../../resources/20.png";
import AxiosAPI from "../../api/AxiosAPI";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { habitInfoState } from "../../util/habitInfoState";
import useHabitData from "../../util/habitInfoHook";

interface HabitMoreProps {
  habitId?: number;
}

const HabitMore: React.FC<HabitMoreProps> = ({ habitId }) => {
  const navigate = useNavigate();
  const habitInfoData = useRecoilValue(habitInfoState);
  const { habitData } = useHabitData(habitInfoData, habitId);

  const handleDeleteClick = () => {
    const deleteHabit = async () => {
      try {
        const response = await AxiosAPI.habitDelete(habitId ? habitId : 0);
        if (response.status === 200) {
          console.log("습관 삭제 성공");
        }
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status === 403) {
          console.log(error);
        }
      }
    };
    deleteHabit();
  };

  const handleChangeClick = () => {
    navigate("/habit/add");
  };
  return (
    <>
      <MoreBox>
        <div className="title">
          {habitData ? habitData.habitName : "null"}
          <Check />
        </div>

        <div className="progress">
          <div className="sticker">
            <img src={Perfect} alt="100%" className="img" />
            <div>100%</div>
          </div>
          <div className="mainSticker">
            <img src={Good} alt="50%" className="mainImg" />
            <div>50%</div>
          </div>
          <div className="sticker">
            <img src={Soso} alt="20%" className="img" />
            <div>20%</div>
          </div>
        </div>
        <div className="graphBox">
          <div className="graphBar" />
        </div>
        <div className="persent">습관 만들기까지 80% 진행됐어요!</div>

        <div className="button">
          <AlertContainer onClick={handleChangeClick}>
            <Edit />
            <div className="change">수정</div>
          </AlertContainer>
          <AlertContainer>
            <Delete onClick={handleDeleteClick} />
            <div className="delete">삭제</div>
          </AlertContainer>
        </div>
      </MoreBox>
    </>
  );
};

const MoreBox = styled.div`
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
    width: 75%;
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
    font-weight: bolder;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    font-size: 20px;
  }
  .img {
    max-width: 50%;
    height: auto;
  }
  .mainImg {
    max-width: 65%;
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
