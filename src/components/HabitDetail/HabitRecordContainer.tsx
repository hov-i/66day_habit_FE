import React, { useState } from "react";
import styled from "styled-components";
import { HabitCalendarBoxProps } from "../../util/types";
import Perfect from "../../resources/100.png";
import Good from "../../resources/50.png";
import Soso from "../../resources/20.png";

const HabitRecordContainer: React.FC<HabitCalendarBoxProps> = ({ day }) => {
  const [selectRecord, setSelectRecord] = useState<number>(0);

  let subMent = "";

  if (day >= 1 && day <= 22) {
    subMent = "시작이 반입니다! 화이팅하세요!";
  } else if (day >= 23 && day <= 44) {
    subMent = "목표를 향해 달리는 당신! 멋져요!";
  } else if (day >= 45 && day <= 66) {
    subMent = "습관 완료까지 얼마 안남았어요! 오늘도 화이팅!";
  }

  const handleRecordClick = (e: number) => {
    setSelectRecord(e);
    if (selectRecord === e) {
      setSelectRecord(0);
    }
  };

  return (
    <>
      <RecordStyle>
        <TitleBox>
          <div className="mainTitle">{day}일차</div>
          <div className="subTitle">{subMent}</div>
        </TitleBox>
        <RecordContainer>
          <RecordBox
            onClick={() => handleRecordClick(100)}
            alt={100}
            selectRecord={selectRecord}
          >
            <img src={Perfect} alt="100" className="img" />
            <div>100%</div>
          </RecordBox>
          <RecordBox
            onClick={() => handleRecordClick(50)}
            alt={50}
            selectRecord={selectRecord}
          >
            <img src={Good} alt="50" className="img" />
            <div>50%</div>
          </RecordBox>
          <RecordBox
            onClick={() => handleRecordClick(20)}
            alt={20}
            selectRecord={selectRecord}
          >
            <img src={Soso} alt="20" className="img" />
            <div>20%</div>
          </RecordBox>
        </RecordContainer>
      </RecordStyle>
    </>
  );
};

const RecordStyle = styled.div`
  margin: 0 auto;
  width: 85%;
`;

const TitleBox = styled.div`
  text-align: left;
  margin-top: 30px;
  .mainTitle {
    font-size: 26px;
    font-weight: bolder;
  }
  .subTitle {
    font-size: 16px;
    margin-top: 10px;
  }
`;

const RecordContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin-top: 10px;
  font-size: 16px;
`;
const RecordBox = styled.div<{ alt: number; selectRecord: number }>`
  width: 50%;
  height: 25vh;
  margin: 10px;
  display: flex;
  justify-content: center;
  background-color: ${(props) =>
    props.alt === props.selectRecord ? "#E8E8E8" : "white"};
  border-radius: 20px;
  align-items: center;
  flex-direction: column;
  .img {
    max-height: 60%;
    width: auto;
    margin-bottom: 10px;
  }
`;
export default HabitRecordContainer;
