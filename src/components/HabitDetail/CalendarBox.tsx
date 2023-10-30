import React, { useState } from "react";
import styled from "styled-components";
import { HabitCalendarBoxProps } from "../../util/types";
import useViewport from "../../util/viewportHook";
import Modal from "../common/Modal";
import HabitRecordContainer from "./HabitRecordContainer";

const CalendarBox: React.FC<HabitCalendarBoxProps> = ({ day }) => {
  const { isMobile } = useViewport();
  const [recordModalOpen, setRecordModalOpen] = useState<boolean>(false);
  const openRecordModal = () => {
    setRecordModalOpen(true);
  };

  const closeRecordModal = () => {
    setRecordModalOpen(false);
  };

  return (
    <>
      <CalendarStyle day={day} isMobile={isMobile}>
        <div className="dayBox">{day}</div>
        <div className="stickerBox" onClick={openRecordModal} />
      </CalendarStyle>
      {recordModalOpen && (
        <Modal
          open={recordModalOpen}
          close={closeRecordModal}
          name="습관 기록"
          height="400px"
        >
          <HabitRecordContainer day={day} />
        </Modal>
      )}
    </>
  );
};

const CalendarStyle = styled.div<{ day: number; isMobile: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin: 5px;

  .dayBox {
    height: 30px;
    color: ${(props) =>
      props.day === 3 || props.day === 7 || props.day === 14 || props.day === 21
        ? "#000000"
        : "#a8a8a8"};
    width: 100%;
    font-weight: ${(props) =>
      props.day === 3 || props.day === 7 || props.day === 14 || props.day === 21
        ? "bolder"
        : "normal"};
    border: 1px solid #363636;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
  }

  .stickerBox {
    height: ${({ isMobile }) => (isMobile ? "70px" : "100px")};
    width: 100%;
    border: 1px solid #363636;
    margin-top: 5px;
  }
`;

export default CalendarBox;
