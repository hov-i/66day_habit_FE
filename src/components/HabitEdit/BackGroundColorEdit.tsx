import React, { useState } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import BackGroundColorBox from "./BackGroundColorBox";
import backgroundColor from "../../style/backgroundColor";
import ScrollBox from "../common/ScrollBox";
import { BackGroundColorEditProps } from "../../util/types";

const BackGroundColorEdit: React.FC<BackGroundColorEditProps> = ({
  setSeletValue,
}) => {
  const { isMobile } = useViewport();
  const [ColorId, setColorId] = useState<number>(0);

  const handleIconClick = (colorId: number) => {
    const category = backgroundColor.find((item) => item.colorId === colorId);
    if (category) {
      setColorId(category.colorId);
      const selectedColor = backgroundColor.find(
        (item) => item.colorId === category.colorId
      );
      const selectedColorName = selectedColor ? selectedColor.name : "";
      setSeletValue(selectedColorName);
    }
  };
  return (
    <EditContainer isMobile={isMobile}>
      <div className="name">배경 색</div>
      <ScrollBox>
        {backgroundColor.map((data, index) => (
          <ActiveBox
            className="activeBox"
            key={index}
            onClick={() => handleIconClick(data.colorId)}
            active={data.colorId === ColorId}
          >
            <BackGroundColorBox id={data.colorId} />
          </ActiveBox>
        ))}
      </ScrollBox>
    </EditContainer>
  );
};

const EditContainer = styled.div<{ isMobile: boolean }>`
  font-size: 16px;
  width: ${(props) => (props.isMobile ? "75%" : "80%")};
  padding-bottom: 20px;
  .name {
    margin-left: 3px;
  }
`;
const ActiveBox = styled.div<{ active: boolean }>`
  width: 100px;
  height: 130px;
  box-shadow: ${(props) =>
    props.active
      ? `  rgba(53, 50, 50, 0.16) 0px 1px 3px, #363636 0px 0px 0px 2px;`
      : ""};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 10px;
  margin-left: 3px;
  border-radius: 10px;
`;
export default BackGroundColorEdit;
