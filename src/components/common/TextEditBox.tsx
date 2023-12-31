import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { TextEditBoxProps } from "../../util/types";

const TextEditBox: React.FC<TextEditBoxProps> = ({
  name,
  placeholder,
  setInputValue,
  value,
  title,
}) => {
  const { isMobile } = useViewport();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setInputValue(value);
  };

  return (
    <EditContainer $isMobile={isMobile}>
      <div className="name">{title}</div>
      <input
        type="text"
        className="input"
        placeholder={placeholder}
        onChange={handleInputChange}
        defaultValue={name === "edit" ? value : ""}
      />
    </EditContainer>
  );
};

const EditContainer = styled.div<{ $isMobile: boolean }>`
  font-size: 16px;
  width: ${(props) => (props.$isMobile ? "75%" : "80%")};
  padding-bottom: 30px;
  .name {
    margin-left: 3px;
  }
  .input {
    width: 100%;
    background-color: #e8e8e8;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 5px;
    border: 0;
    height: 35px;
    padding-left: 10px;
    margin-top: 10px;
  }
`;

export default TextEditBox;
