import React from "react";
import styled from "styled-components";
import backgroundColor from "../../style/backgroundColor";
import { BackGroundColorBoxProps } from "../../util/types";

const BackGroundColorBox: React.FC<BackGroundColorBoxProps> = ({
  id,
  onClick,
}) => {
  const selectedColor = backgroundColor.find((item) => item.colorId === id);

  return (
    <ColorBox
      color={
        selectedColor
          ? selectedColor.color
          : "linear-gradient(-45deg, #363636 0%, #363636 100%)"
      }
      onClick={onClick}
    />
  );
};

const ColorBox = styled.div<{
  color: string;
}>`
  width: 100px;
  border-radius: 10px;
  flex-shrink: 0;

  height: 130px;
  background-image: ${(props) =>
    props.color
      ? props.color
      : "linear-gradient(-45deg, #363636 0%, #363636 100%)"};
`;

export default BackGroundColorBox;
