import React, { useEffect } from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Navbar from "../components/common/NavBar";
import Profile from "../components/Main/Profile";
import HabitBox from "../components/Main/HabitBox";
import Container from "../components/common/Container";
import LifeQuotes from "../components/Main/LifeQuotes";
import HabitAddButton from "../components/Main/HabitAddButton";
import ContentContainer from "../components/common/CotentContainer";
import AxiosAPI from "../api/AxiosAPI";
import { habitInfoState } from "../util/habitInfoState";
import { useRecoilState } from "recoil";

const LoginPage = () => {
  const [habitInfoData, setHabitInfoData] = useRecoilState(habitInfoState);

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const response = await AxiosAPI.mainUserInfo();
        if (response.status === 200)
          setHabitInfoData(response.data.data.habitList);
        console.log(response.data.data.habitList);
      } catch (e) {
        console.log(e);
      }
    };
    getMyInfo();
  }, [setHabitInfoData]);
  return (
    <Box>
      <MainContainer>
        <Container>
          <Profile name="main" />
          <Navbar />
          <ContentContainer name="main">
            <HabitContainer>
              <LifeQuotes />
              {habitInfoData?.map((data, index) => (
                <HabitBox key={index} name="main" habitId={data.id} />
              ))}
              <HabitAddButton />
            </HabitContainer>
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

const HabitContainer = styled.div`
  width: 80%;
`;

export default LoginPage;
