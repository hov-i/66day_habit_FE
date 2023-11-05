import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ProfileProps } from "../../util/types";

const LifeQuotes = ({ name }: ProfileProps) => {
  const { isMobile } = useViewport();
  return (
    <LifeQuotesBox name={name ? name : ""} isMobile={isMobile}>
      명언 글귀 입니다.
    </LifeQuotesBox>
  );
};
const LifeQuotesBox = styled.div<{ isMobile: boolean; name: string }>`
  height: ${(props) => (props.isMobile ? "75px" : "80px")};
  background-color: #e8e8e8;
  border-radius: 10px;
  display: flex;
  margin-top: ${(props) => (props.name === "main" ? "0px" : "35px")};
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export default LifeQuotes;
