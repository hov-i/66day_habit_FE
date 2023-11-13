import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { HabitCalendarBoxProps, HabitRecordData } from "../../util/types";
import useViewport from "../../util/viewportHook";
import Modal from "../common/Modal";
import HabitRecordContainer from "./HabitRecordContainer";
import Perfect from "../../resources/100.png";
import Good from "../../resources/50.png";
import Soso from "../../resources/20.png";
import { useRecoilValue } from "recoil";
import { habitIdState, memberIdState } from "../../util/habitState";
import AxiosAPI from "../../api/AxiosAPI";

const CalendarBox: React.FC<HabitCalendarBoxProps> = ({ day }) => {
  const { isMobile } = useViewport();
  const habitIdData = useRecoilValue(habitIdState);
  const selectId = useRecoilValue(memberIdState);
  const [habitRecordData, setHabitRecordData] = useState<HabitRecordData[]>([]);

  const [recordModalOpen, setRecordModalOpen] = useState<boolean>(false);

  const achievementRate = habitRecordData?.find(
    (record) => record.dayNumber === day
  )?.achievementRate;

  let sticker = null;

  useEffect(() => {
    const getHabitRecord = async () => {
      try {
        const response = await AxiosAPI.habitRecord(habitIdData);
        if (response.status === 200) setHabitRecordData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getHabitRecord();
  }, [habitIdData]);

  if (achievementRate === 100) {
    sticker = Perfect;
  } else if (achievementRate === 50) {
    sticker = Good;
  } else if (achievementRate === 20) {
    sticker = Soso;
  }

  const openRecordModal = () => {
    if (selectId === 0) {
      setRecordModalOpen(true);
    }
  };

  const closeRecordModal = () => {
    setRecordModalOpen(false);
  };

  return (
    <>
      <CalendarStyle $day={day} $isMobile={isMobile}>
        <div className="dayBox">{day}</div>
        <div className="stickerBox" onClick={openRecordModal}>
          {sticker !== null && (
            <img src={sticker} alt="value" className="img" />
          )}
        </div>
      </CalendarStyle>
      {recordModalOpen && (
        <Modal
          open={recordModalOpen}
          close={closeRecordModal}
          name="습관 기록"
          height="400px"
        >
          <HabitRecordContainer day={day} achievementRate={achievementRate} />
        </Modal>
      )}
    </>
  );
};

const CalendarStyle = styled.div<{ $day: number; $isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin: 5px;

  .dayBox {
    height: 30px;
    color: ${(props) =>
      props.$day === 3 ||
      props.$day === 7 ||
      props.$day === 14 ||
      props.$day === 21
        ? "#000000"
        : "#a8a8a8"};
    width: 100%;
    font-weight: ${(props) =>
      props.$day === 3 ||
      props.$day === 7 ||
      props.$day === 14 ||
      props.$day === 21
        ? "bolder"
        : "normal"};
    border: 1px solid #363636;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .stickerBox {
    height: ${(props) => (props.$isMobile ? "70px" : "100px")};
    width: 100%;
    border: 1px solid #363636;
    margin-top: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .img {
    max-height: 70%;
    width: auto;
  }
`;

export default CalendarBox;
