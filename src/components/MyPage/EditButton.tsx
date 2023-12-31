import React from "react";
import styled from "styled-components";
import { ButtonProps } from "../../util/types";

const EditButton: React.FC<ButtonProps> = ({ name, onClick }) => {
  return <ButtonStyle onClick={onClick}>{name}</ButtonStyle>;
};
const ButtonStyle = styled.button`
  padding: 8px;
  padding-left: 10px;
  padding-right: 10px;
  font-size: 16px;
  color: white;
  background-color: #363636;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;
export default EditButton;
