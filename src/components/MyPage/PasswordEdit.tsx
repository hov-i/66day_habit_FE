import React, { useState } from "react";
import styled from "styled-components";
import TextEditBox from "../common/TextEditBox";
import EditButton from "./EditButton";

const PasswordEdit = () => {
  const [inputNowPwd, setInputNowPwd] = useState("");
  const [inputNewPwd, setInputNewPwd] = useState("");

  const handleNowPwdInputChange = (value: string) => {
    setInputNowPwd(value);
  };

  const handleNewPwdInputChange = (value: string) => {
    setInputNewPwd(value);
  };
  return (
    <EmailContainer>
      <TextEditBox
        name="현재 비밀번호"
        placeholder="현재 비밀번호를 입력해주세요"
        setInputValue={handleNowPwdInputChange}
      />
      <TextEditBox
        name="변경 비밀번호"
        placeholder="변경 비밀번호를 입력해주세요"
        setInputValue={handleNewPwdInputChange}
      />
      <EditButton name="비밀번호 수정" />
    </EmailContainer>
  );
};

const EmailContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  padding-top: 90px;
  .email {
    color: #8f8f8f;
    margin: 0;
    margin-top: 7px;
  }
`;
export default PasswordEdit;
