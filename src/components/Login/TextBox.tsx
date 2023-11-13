import React from "react";
import styled from "styled-components";
import { ReactComponent as Email } from "../../resources/Icons/email.svg";
import { ReactComponent as Password } from "../../resources/Icons/password.svg";
import useViewport from "../../util/viewportHook";
import { TextBoxProps } from "../../util/types";

const TextBox: React.FC<TextBoxProps> = ({ name, setInputValue }) => {
  const { isMobile } = useViewport();
  const getItemSvg = (svgName: string) => {
    switch (svgName) {
      case "이메일":
        return <Email />;
      case "비밀번호":
        return <Password />;
      default:
        return null;
    }
  };

  const inputType = name === "이메일" ? "text" : "password";
  const placeholderText = name === "이메일" ? "이메일" : "비밀번호";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = e.target.value;
    setInputValue(value);
  };

  return (
    <TextBoxStyle $isMobile={isMobile}>
      {getItemSvg(name)}
      <input
        className="input"
        type={inputType}
        placeholder={placeholderText}
        onChange={handleInputChange}
      />
    </TextBoxStyle>
  );
};

const TextBoxStyle = styled.div<{ $isMobile: boolean }>`
  width: ${(props) => (props.$isMobile ? "70%" : "400px")};
  border-radius: 10px;
  background-color: #e8e8e8;
  border: 0;
  height: 60px;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  padding: 20px;

  .input {
    width: 100%;
    border: none;
    outline: none;
    background: transparent;
    font-size: 16px;
    padding-left: 20px;
  }
`;

export default TextBox;
