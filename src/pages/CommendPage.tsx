import React, { useEffect } from "react";
import styled from "styled-components";
import Container from "../components/common/Container";
import Box from "../components/common/Box";
import { ReactComponent as Like } from "../resources/Icons/like.svg";
import HabitBox from "../components/Main/HabitBox";
import Navbar from "../components/common/NavBar";
import AxiosAPI from "../api/AxiosAPI";
import { useRecoilState } from "recoil";
import { commendHabitInfoState } from "../util/habitState";
import useViewport from "../util/viewportHook";

const CommendPage = () => {
  const [commendHabitInfoData, setCommendHabitInfoData] = useRecoilState(
    commendHabitInfoState
  );
  const { isMobile } = useViewport();
  useEffect(() => {
    const getRandomHabits = async () => {
      try {
        const response = await AxiosAPI.randomHabit();
        if (response.status === 200)
          setCommendHabitInfoData(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomHabits();
  }, [setCommendHabitInfoData]);
  return (
    <>
      <Box>
        <Container>
          <CommendContainer $isMobile={isMobile}>
            <div className="title">
              <p>
                {" "}
                BetterUp 선정
                <br /> '정신건강에 좋은 습관' 추천
              </p>
              <Like />
            </div>
            <div className="habitBox">
              {commendHabitInfoData?.map((data, index) => (
                <HabitBox
                  key={index}
                  name="commend"
                  habitName={data.habitName}
                  title={data.habitSubject}
                />
              ))}
            </div>
          </CommendContainer>
          <Navbar />
        </Container>
      </Box>
    </>
  );
};

const CommendContainer = styled.div<{ $isMobile: boolean }>`
  .title {
    width: 80%;
    font-size: ${(props) => (props.$isMobile ? "25px" : "40px")};
    font-family: "Noto Sans Bold";
    margin: 0 auto;
    padding-top: 30px;
    padding-bottom: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    > svg {
      fill: #202020;
    }
  }

  .habitBox {
    margin: 0 auto;
    width: 80%;
  }
`;

export default CommendPage;
