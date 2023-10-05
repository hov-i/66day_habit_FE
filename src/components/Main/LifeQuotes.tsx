import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";

const LifeQuotes = () => {
  const { isMobile } = useViewport();
  return <LifeQuotesBox isMobile={isMobile}>명언 글귀 입니다.</LifeQuotesBox>;
};
const LifeQuotesBox = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "85%" : "80%")};
  height: ${(props) => (props.isMobile ? "75px" : "80px")};
  background-color: #e8e8e8;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 16px;
`;

export default LifeQuotes;
