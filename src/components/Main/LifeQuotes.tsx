import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ProfileProps, QuoteData } from "../../util/types";
import AxiosAPI from "../../api/AxiosAPI";

const LifeQuotes = ({ name }: ProfileProps) => {
  const { isMobile } = useViewport();
  const [quotes, setQuotes] = useState<QuoteData>({
    wiseSaying: "",
    greatPerson: "",
  });
  useEffect(() => {
    const getRandomQuotes = async () => {
      try {
        const response = await AxiosAPI.randomQuote();
        if (response.status === 200) setQuotes(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomQuotes();
  }, [name]);
  return (
    <LifeQuotesBox name={name ? name : ""} isMobile={isMobile}>
      <div className="wiseSaying">{quotes?.wiseSaying}</div>
      <div className="greatPerson">-{quotes?.greatPerson}-</div>
    </LifeQuotesBox>
  );
};
const LifeQuotesBox = styled.div<{ isMobile: boolean; name: string }>`
  height: ${(props) => (props.isMobile ? "75px" : "80px")};
  background-color: #e8e8e8;
  border-radius: 10px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  .greatPerson {
    text-align: center;
    color: #878787;
  }
  .wiseSaying {
    text-align: center;
    font-size: 16px;
    color: #000000;
  }
`;

export default LifeQuotes;
