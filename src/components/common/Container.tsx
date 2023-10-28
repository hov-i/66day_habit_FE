import React from "react";
import styled from "styled-components";
import { ContainerProps } from "../../util/types";

const Container: React.FC<ContainerProps> = ({ children }) => {
  return <ContainerStyle>{children}</ContainerStyle>;
};
const ContainerStyle = styled.div`
  width: 100%;
  padding-bottom: 100px;
`;

export default Container;
