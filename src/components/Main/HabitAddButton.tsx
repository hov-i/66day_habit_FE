import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as Add } from "../../resources/Icons/add.svg";

const HabitAddButton = () => {
  const { isMobile } = useViewport();
  return (
    <>
      <HabitButtonStyle isMobile={isMobile}>
        <Add />
      </HabitButtonStyle>
    </>
  );
};

const HabitButtonStyle = styled.button<{ isMobile: boolean }>`
  width: 100%;
  height: ${(props) => (props.isMobile ? "95px" : "105px")};
  background-color: #363636;
  margin-top: 40px;
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HabitAddButton;
