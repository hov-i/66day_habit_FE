import React from "react";
import styled from "styled-components";
import { ReactComponent as Right } from "../../resources/right.svg";

const NextButton = () => {
  return (
    <NextButtonStyle>
      <Right />
    </NextButtonStyle>
  );
};

const NextButtonStyle = styled.button`
  background-color: #363636;
  border-radius: 50%;
  width: 45px;
  height: 45px;
  box-shadow: 0px 5px 4px 0px rgba(0, 0, 0, 0.25);
  align-items: center;
  display: flex;
  justify-content: center;
`;

export default NextButton;
