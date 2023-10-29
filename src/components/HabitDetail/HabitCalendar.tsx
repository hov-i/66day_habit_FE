import React from "react";
import styled from "styled-components";
import CalendarBox from "./CalendarBox";

const HabitCalendar = () => {
  return (
    <>
      <Habit6DayContainer>
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
      </Habit6DayContainer>
      <Habit6DayContainer>
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
      </Habit6DayContainer>
      <Habit6DayContainer>
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
      </Habit6DayContainer>
      <Habit6DayContainer>
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
      </Habit6DayContainer>
      <Habit6DayContainer>
        <CalendarBox day="1" />
        <CalendarBox day="3" />
        <CalendarBox day="7" />
        <CalendarBox day="14" />
        <CalendarBox day="21" />
        <CalendarBox day="1" />
      </Habit6DayContainer>
      <Habit6DayContainer>
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
        <CalendarBox day="1" />
      </Habit6DayContainer>
    </>
  );
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
