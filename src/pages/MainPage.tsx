import React from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Navbar from "../components/common/NavBar";
import Profile from "../components/Main/Profile";
import HabitBox from "../components/Main/HabitBox";
import Container from "../components/common/Container";
import LifeQuotes from "../components/Main/LifeQuotes";
import HabitAddButton from "../components/Main/HabitAddButton";
const LoginPage = () => {
  return (
    <Box>
      <MainContainer>
        <Container>
          <Profile />
          <Navbar />
          <ContentContainer>
            <LifeQuotes />
            <HabitBox />
            <HabitBox />
            <HabitBox />
            <HabitAddButton />
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

const ContentContainer = styled.div`
  margin-top: 180px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;

export default LoginPage;
