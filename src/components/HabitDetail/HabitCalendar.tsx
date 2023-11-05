import React, { useEffect } from "react";
import styled from "styled-components";
import CalendarBox from "./CalendarBox";
import AxiosAPI from "../../api/AxiosAPI";
import { useRecoilValue, useSetRecoilState } from "recoil";
import {
  memberHabitInfoState,
  memberIdState,
  userHabitInfoState,
} from "../../util/habitState";

const HabitCalendar = () => {
  const setUserHabitInfoData = useSetRecoilState(userHabitInfoState);
  const setMemberHabitInfoData = useSetRecoilState(memberHabitInfoState);
  const selectId = useRecoilValue(memberIdState);
  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const response = await AxiosAPI.mainUserInfo();
        if (response.status === 200)
          setUserHabitInfoData(response.data.data.habitList);
        console.log(response.data.data.habitList);
      } catch (e) {
        console.log(e);
      }
    };
    getMyInfo();

    const getFriendUserInfo = async () => {
      try {
        const response = await AxiosAPI.friendUserInfo(selectId);
        if (response.status === 200)
          setMemberHabitInfoData(response.data.data.friendHabitList);
        console.log(response.data.data.friendHabitList);
      } catch (e) {
        console.log(e);
      }
    };
    getFriendUserInfo();
  }, [setUserHabitInfoData, selectId, setMemberHabitInfoData]);
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
