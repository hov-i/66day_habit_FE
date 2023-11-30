import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import Navbar from "../components/common/NavBar";
import Box from "../components/common/Box";
import HabitTitleBox from "../components/HabitDetail/HabitTitleBox";
import HabitCalendar from "../components/HabitDetail/HabitCalendar";
import AxiosAPI from "../api/AxiosAPI";
import { useRecoilValue } from "recoil";
import { habitIdState } from "../util/habitState";
import DayEventBox from "../components/HabitDetail/DayEventBox";
import DayModal from "../components/common/DayModal";

const HabitDetailPage = () => {
  const habitId = useRecoilValue(habitIdState);
  const [dayModalOpen, setDayModalOpen] = useState<boolean>(false);
  const [day, setDay] = useState<number>(0);

  const openDayModal = (receivedDay: number) => {
    setDay(receivedDay);
    setDayModalOpen(true);
  };

  const closeDayModal = () => {
    setDayModalOpen(false);
  };

  useEffect(() => {
    const getDay = async () => {
      try {
        const response = await AxiosAPI.habitMore(habitId);
        if (response.status === 200) {
          console.log(response.data.data);
          const receivedDay = response.data.data.inspireDay;

          if (receivedDay === 3 || receivedDay === 7 || receivedDay === 14) {
            openDayModal(receivedDay);
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    getDay();
  }, [habitId]);

  return (
    <>
      <Box>
        <Container>
          <HabitTitleBox />
          <HabitCalendar />
          <Navbar />
        </Container>
      </Box>
      {dayModalOpen && (
        <DayModal
          open={dayModalOpen}
          close={closeDayModal}
          name="day 이벤트"
          height="400px"
        >
          <DayEventBox day={day} />
        </DayModal>
      )}
    </>
  );
};

export default HabitDetailPage;
