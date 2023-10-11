import React from "react";
import styled from "styled-components";
import HabitBox from "../Main/HabitBox";

const NewHabbitContainer = () => {
  return (
    <Container>
      <div className="title">✨ 새로 생긴 습관들</div>
      <div className="habitContainer">
        <HabitBox />
        <HabitBox />
        <HabitBox />
        <HabitBox />
        <HabitBox />
      </div>
    </Container>
  );
};
const Container = styled.div`
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  .title {
    font-weight: bolder;
    font-size: 24px;
    text-align: left;
    width: 80%;
  }
  .habitContainer {
    height: 300px;
    overflow: scroll;
    width: 80%;
  }
`;

export default NewHabbitContainer;
