import React from "react";
import styled from "styled-components";
import Container from "../components/common/Container";
import Box from "../components/common/Box";
import { ReactComponent as Like } from "../resources/Icons/like.svg";
import HabitBox from "../components/Main/HabitBox";
import Navbar from "../components/common/NavBar";
const CommendPage = () => {
  return (
    <>
      <Box>
        <Container>
          <CommendContainer>
            <div className="title">
              <p>
                {" "}
                성공한 사람들의
                <br /> 습관추천
              </p>
              <Like />
            </div>
            <div className="habitBox">
              <HabitBox />
              <HabitBox />
              <HabitBox />
              <HabitBox />
              <HabitBox />
            </div>
          </CommendContainer>
          <Navbar />
        </Container>
      </Box>
    </>
  );
};

const CommendContainer = styled.div`
  .title {
    width: 80%;
    font-size: 32px;
    font-family: "Noto Sans Bold";
    margin: 0 auto;
    padding-top: 70px;
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
