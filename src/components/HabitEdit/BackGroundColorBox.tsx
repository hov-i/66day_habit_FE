import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import backgroundColor from "../../style/backgroundColor";

interface BackGroundColorBoxProps {
  id: number;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const BackGroundColorBox: React.FC<BackGroundColorBoxProps> = ({
  id,
  onClick,
}) => {
  const { isMobile } = useViewport();
  const selectedColor = backgroundColor.find((item) => item.colorId === id);

  return (
    <ColorBox
      isMobile={isMobile}
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
  isMobile: boolean;
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
