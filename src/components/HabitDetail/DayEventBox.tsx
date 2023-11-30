import React from "react";
import styled from "styled-components";
import Day3 from "../../resources/3day.png";
import Day7 from "../../resources/7day.png";
import Day14 from "../../resources/14day.png";

const DayEventBox = ({ day }: { day: number }) => {
  let dayImage;

  if (day === 3) {
    dayImage = <img className="img" src={Day3} alt="Day 3" />;
  } else if (day === 7) {
    dayImage = <img className="img" src={Day7} alt="Day 7" />;
  } else {
    dayImage = <img className="img" src={Day14} alt="Day 14" />;
  }

  return (
    <DayContainer>
      <div className="title">{day}일차</div>
      {dayImage}
      <div className="content">오늘도 와주셨군요!</div>
      <div className="content2">{day}일차가 되신 것을 축하해요!</div>
    </DayContainer>
  );
};

export default DayEventBox;

const DayContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .img {
    width: 80%;
    height: auto;
    padding-top: 90px;
  }

  .title {
    font-weight: bolder;
    font-size: 32px;
  }

  .content {
    font-size: 18px;
    padding-top: 40px;
  }
  .content2 {
    font-size: 18px;
  }
`;
