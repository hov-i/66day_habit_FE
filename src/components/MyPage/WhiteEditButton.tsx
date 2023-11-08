import React from "react";
import styled from "styled-components";
import { ButtonProps } from "../../util/types";

const WhiteEditButton: React.FC<ButtonProps> = ({ name, onClick }) => {
  return <ButtonStyle onClick={onClick}>{name}</ButtonStyle>;
};
const ButtonStyle = styled.button`
  padding: 8px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  color: #363636;
  border: 1px solid #363636;
  background-color: white;
  border-radius: 8px;
  cursor: pointer;
`;
export default WhiteEditButton;
