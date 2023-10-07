import React, { ReactNode } from "react";
import styled from "styled-components";

interface ContentProps {
  children: ReactNode;
  name: string;
}

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
