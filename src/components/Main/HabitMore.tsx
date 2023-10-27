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

const HabitMore = () => {
  const navigate = useNavigate();
  const handleDeleteClick = () => {
    const deleteHabit = async () => {
      try {
        const response = await AxiosAPI.habitDelete(1);
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
          하루한번씩 커밋 꼭하기
          <Check />
        </div>
        <div className="graphBox">
          <div className="graphBar" />
        </div>
        80%
        <div className="progress">
          <div className="sticker">
            <img src={Perfect} alt="100%" className="img" />
            <div>100%</div>
          </div>
          <div className="sticker">
            <img src={Good} alt="50%" className="img" />
            <div>50%</div>
          </div>
          <div className="sticker">
            <img src={Soso} alt="20%" className="img" />
            <div>20%</div>
          </div>
        </div>
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
      width: 40px;
    }
  }
  .graphBox {
    width: 70%;
    background-color: #e8e8e8;
    height: 10px;
    border-radius: 5px;
    margin-top: 10px;
  }
  .graphBar {
    width: 70%;
    background-color: #363636;
    height: 10px;
    border-radius: 5px;
  }
  .progress {
    display: flex;
    margin-top: 20px;
  }
  .sticker {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .img {
    max-width: 45%;
    height: auto;
  }

  .button {
    display: flex;
    width: 60%;
    align-items: center;
    justify-content: space-between;
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
  justify-content: center;
  margin-top: 50px;
  background-color: white;
  border-radius: 8px;
  border: 1px solid #363636;
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
