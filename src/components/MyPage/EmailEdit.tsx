import React from "react";
import styled from "styled-components";
import TextEditBox from "../common/TextEditBox";
import EditButton from "./EditButton";

const EmailEdit = () => {
  return (
    <EmailContainer>
      <TextEditBox
        name="변경 이메일"
        placeholder="변경할 이메일을 입력해주세요"
      />
      <EditButton name="이메일 수정" />
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
export default EmailEdit;
