import React from "react";
import styled from "styled-components";
import HabitBox from "../Main/HabitBox";

const NewHabbitContainer = () => {
  return (
    <Container>
      <div className="title">✨ 새로 생긴 습관들</div>
      <div className="habitContainer">
        <HabitBox name="search" />
        <HabitBox name="search" />
        <HabitBox name="search" />
        <HabitBox name="search" />
        <HabitBox name="search" />
      </div>
    </Container>
  );
};
const Container = styled.div`
  padding-top: 160px;
  padding-bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid #c7c7c7;
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
