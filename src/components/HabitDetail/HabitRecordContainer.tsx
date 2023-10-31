import React, { useState } from "react";
import styled from "styled-components";
import { HabitCalendarBoxProps } from "../../util/types";
import Perfect from "../../resources/100.png";
import Good from "../../resources/50.png";
import Soso from "../../resources/20.png";
import { useRecoilValue } from "recoil";
import { habitIdState, habitInfoState } from "../../util/habitState";
import useHabitData from "../../util/habitInfoHook";
import AxiosAPI from "../../api/AxiosAPI";
import Alert from "../common/Alert";
import RecordErrorAlert from "./RecordErrorAlert";

const HabitRecordContainer: React.FC<HabitCalendarBoxProps> = ({ day }) => {
  const habitInfoData = useRecoilValue(habitInfoState);
  const habitIdData = useRecoilValue(habitIdState);
  const [recordErrorAlert, setRecordErrorAlert] = useState<boolean>(false);
  const { habitData } = useHabitData(habitInfoData, habitIdData);
  const achievementRate = habitData?.habitRecord.find(
    (record) => record.dayNumber === day
  )?.achievementRate;

  const [selectRecord, setSelectRecord] = useState<number>(
    achievementRate ? achievementRate : 0
  );

  const openRecordErrorAlert = () => {
    setRecordErrorAlert(true);
  };

  const closeRecordErrorAlert = () => {
    setRecordErrorAlert(false);
  };

  let subMent = "";

  if (day >= 1 && day <= 22) {
    subMent = "시작이 반입니다! 화이팅하세요!";
  } else if (day >= 23 && day <= 44) {
    subMent = "목표를 향해 달리는 당신! 멋져요!";
  } else if (day >= 45 && day <= 66) {
    subMent = "습관 완료까지 얼마 안남았어요! 오늘도 화이팅!";
  }

  const handleRecordClick = (e: number) => {
    if (selectRecord === e) {
      setSelectRecord(0);
      const handleDeleteRecord = () => {
        const deleteRecord = async () => {
          try {
            const dayNumber: number = day ? day : 0;
            const habitIdValue: number = habitIdData ? habitIdData : 0;
            const response = await AxiosAPI.habitRecordDelete(
              habitIdValue,
              dayNumber
            );
            if (response && response.status === 200) {
              console.log("습관 기록 삭제 성공");
              window.location.replace("/habit/detail");
            }
          } catch (error) {
            console.error(error);
          }
        };
        deleteRecord();
      };
      handleDeleteRecord();
    } else if (selectRecord === 0 && selectRecord !== e) {
      setSelectRecord(e);
      const handleCreateRecord = () => {
        const postRecordCreate = async () => {
          try {
            const dayNumber: number = day ? day : 0;
            const achievementRate: number = e ? e : 0;
            const habitIdValue: number = habitIdData ? habitIdData : 0;
            const response = await AxiosAPI.habitRecordCreate(
              dayNumber,
              achievementRate,
              habitIdValue
            );
            if (response && response.status === 200) {
              console.log("습관 기록 생성 성공");
              window.location.replace("/habit/detail");
            }
          } catch (error) {
            console.error(error);

            openRecordErrorAlert();
            setSelectRecord(0);
          }
        };
        postRecordCreate();
      };
      handleCreateRecord();
    } else if (selectRecord !== 0 && selectRecord !== e) {
      setSelectRecord(e);
      const handleChangeRecord = () => {
        const putRecordChange = async () => {
          try {
            const dayNumber: number = day ? day : 0;
            const achievementRate: number = e ? e : 0;
            const habitIdValue: number = habitIdData ? habitIdData : 0;
            const response = await AxiosAPI.habitRecordChange(
              dayNumber,
              achievementRate,
              habitIdValue
            );
            if (response && response.status === 200) {
              console.log("습관 기록 수정 성공");
              window.location.replace("/habit/detail");
            }
          } catch (error) {
            console.error(error);

            openRecordErrorAlert();
            setSelectRecord(0);
          }
        };
        putRecordChange();
      };
      handleChangeRecord();
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
      {recordErrorAlert && (
        <Alert
          open={recordErrorAlert}
          close={closeRecordErrorAlert}
          name="습관기록 생성 에러"
        >
          <RecordErrorAlert onClose={closeRecordErrorAlert} />
        </Alert>
      )}
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
