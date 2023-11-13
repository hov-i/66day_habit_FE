import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as Add } from "../../resources/Icons/add.svg";
import { useNavigate } from "react-router-dom";

const HabitAddButton = () => {
  const { isMobile } = useViewport();
  const navigate = useNavigate();
  return (
    <>
      <HabitButtonStyle
        $isMobile={isMobile}
        onClick={() => navigate("/habit/add")}
      >
        <Add />
      </HabitButtonStyle>
    </>
  );
};

const HabitButtonStyle = styled.button<{ $isMobile: boolean }>`
  width: 100%;
  height: ${(props) => (props.$isMobile ? "95px" : "105px")};
  background-color: #363636;
  margin-top: 40px;
  border-radius: 23px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default HabitAddButton;
