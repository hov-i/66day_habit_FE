import React, { useState } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { FontColorEditProps } from "../../util/types";

const FontColorEdit: React.FC<FontColorEditProps> = ({ setSeletValue }) => {
  const { isMobile } = useViewport();
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

  const handleIconClick = (colorName: string) => {
    setSeletValue(colorName);
    setSelectedColor(colorName);
  };

  return (
    <EditContainer isMobile={isMobile}>
      <div className="name">글씨 색</div>
      <ColorButton
        active="BLACK"
        onClick={() => handleIconClick("BLACK")}
        selected={selectedColor === "BLACK"}
      >
        검정색
      </ColorButton>
      <ColorButton
        active="WHITE"
        onClick={() => handleIconClick("WHITE")}
        selected={selectedColor === "WHITE"}
      >
        하얀색
      </ColorButton>
    </EditContainer>
  );
};

const EditContainer = styled.div<{ isMobile: boolean }>`
  font-size: 16px;
  width: ${(props) => (props.isMobile ? "75%" : "80%")};
  padding-bottom: 30px;
  .name {
    margin-left: 3px;
  }
`;
const ColorButton = styled.button<{ active: string; selected: boolean }>`
  padding: 8px;
  font-size: 16px;
  margin-top: 10px;
  margin-right: 15px;
  background-color: ${(props) =>
    props.active === "BLACK" ? `#363636` : `white`};
  border-radius: 8px;
  border: 1px solid #363636;
  cursor: pointer;
  box-shadow: ${(props) =>
    props.selected
      ? "rgba(53, 50, 50, 0.16) 0px 1px 1px, #363636 0px 0px 0px 1px"
      : "none"};
  color: ${(props) => (props.active === "BLACK" ? `white` : `#363636`)};
  outline: none;
`;

export default FontColorEdit;
