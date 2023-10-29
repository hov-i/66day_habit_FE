import React from "react";
import Container from "../components/common/Container";
import Navbar from "../components/common/NavBar";
import Box from "../components/common/Box";
import HabitTitleBox from "../components/HabitDetail/HabitTitleBox";
import HabitCalendar from "../components/HabitDetail/HabitCalendar";

const HabitDetailPage = () => {
  return (
    <>
      <Box>
        <Container>
          <HabitTitleBox />
          <HabitCalendar />
          <Navbar />
        </Container>
      </Box>
    </>
  );
};

export default HabitDetailPage;
