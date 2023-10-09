import React from "react";
import styled from "styled-components";

interface ButtonProps {
  name: string;
}

const EditButton: React.FC<ButtonProps> = ({ name }) => {
  return <ButtonStyle>{name}</ButtonStyle>;
};
const ButtonStyle = styled.button`
  padding: 8px;
  font-size: 16px;
  color: white;
  margin-top: 50px;
  background-color: #363636;
  border-radius: 8px;
  border: none;
  cursor: pointer;
`;
export default EditButton;
