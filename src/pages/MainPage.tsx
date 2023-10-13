import React from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Navbar from "../components/common/NavBar";
import Profile from "../components/Main/Profile";
import HabitBox from "../components/Main/HabitBox";
import Container from "../components/common/Container";
import LifeQuotes from "../components/Main/LifeQuotes";
import HabitAddButton from "../components/Main/HabitAddButton";
import ContentContainer from "../components/common/CotentContainer";
const LoginPage = () => {
  return (
    <Box>
      <MainContainer>
        <Container>
          <Profile name="main" />
          <Navbar />
          <ContentContainer name="main">
            <HabbitContainer>
              <LifeQuotes />
              <HabitBox name="main" />
              <HabitBox name="main" />
              <HabitBox name="main" />
              <HabitAddButton />
            </HabbitContainer>
          </ContentContainer>
        </Container>
      </MainContainer>
    </Box>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const HabbitContainer = styled.div`
  width: 80%;
`;

export default LoginPage;
