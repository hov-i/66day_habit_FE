import React from "react";
import styled from "styled-components";
import { HabitCalendarBoxProps } from "../../util/types";

const CalendarBox: React.FC<HabitCalendarBoxProps> = ({ day }) => {
  const dayValue = typeof day === "number" ? day : 0;
  return (
    <CalendarStyle day={dayValue}>
      <div className="dayBox">{day}</div>
      <div className="stikerBox" />
    </CalendarStyle>
  );
};

const CalendarStyle = styled.div<{ day: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  margin: 5px;

  .dayBox {
    height: 25px;
    width: 100%;
    border: 1px solid black;
    display: flex;
    color: ${(props) =>
      props.day === 3 || props.day === 7 || props.day === 14 || props.day === 21
        ? "#363636"
        : "black"};
    align-items: center;
    justify-content: center;
    font-size: 14px;
    font-weight: ${(props) =>
      props.day === 3 || props.day === 7 || props.day === 14 || props.day === 21
        ? "bolder"
        : "normal"};
  }
  .stikerBox {
    height: 80px;
    width: 100%;
    border: 1px solid black;
    margin-top: 5px;
  }
`;
export default CalendarBox;
