import React from "react";
import styled from "styled-components";
import { ContentProps } from "../../util/types";

const ContentContainer: React.FC<ContentProps> = ({ children, name }) => {
  return <ContentContainerStyle name={name}>{children}</ContentContainerStyle>;
};

const ContentContainerStyle = styled.div<{ name: string }>`
  margin-top: ${(props) => (props.name === "edit" ? "80px" : "180px")};
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
export default ContentContainer;
