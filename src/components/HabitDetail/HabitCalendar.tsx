import React from "react";
import styled from "styled-components";
import CalendarBox from "./CalendarBox";

const HabitCalendar = () => {
  const habitContainers = [];

  for (let i = 0; i < 11; i++) {
    const calendarBoxes = [];
    for (let j = 1; j <= 6; j++) {
      const day = i * 6 + j;
      calendarBoxes.push(<CalendarBox key={day} day={day} />);
    }
    habitContainers.push(
      <Habit6DayContainer key={i}>{calendarBoxes}</Habit6DayContainer>
    );
  }

  return <>{habitContainers}</>;
};

export default HabitCalendar;

const Habit6DayContainer = styled.div`
  display: flex;
  width: 85%;
  margin: 0 auto;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`;
