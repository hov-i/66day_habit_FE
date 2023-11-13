import React, { useState } from "react";
import styled from "styled-components";
import TextEditBox from "../common/TextEditBox";
import EditButton from "./EditButton";
import AxiosAPI from "../../api/AxiosAPI";
import Alert from "../common/Alert";
import EmailErrorAlert from "./EmailErrorAlert";

const EmailEdit = () => {
  const [inputChangeEmail, setInputChangeEmail] = useState<string>("");
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const openErrorAlert = () => {
    setErrorAlert(true);
  };

  const closeErrorAlert = () => {
    setErrorAlert(false);
  };

  const handleEmailInputChange = (value: string) => {
    setInputChangeEmail(value);
  };

  const handleEmailChangeClick = () => {
    const putEmailChange = async () => {
      try {
        const response = await AxiosAPI.userEmailChange(inputChangeEmail);
        if (response.status === 200) {
          console.log("이메일 수정 성공");
          window.location.reload();
        }
      } catch (error) {
        console.log(error);
        openErrorAlert();
      }
    };
    putEmailChange();
  };

  return (
    <>
      <EmailContainer>
        <TextEditBox
          title="변경 이메일"
          placeholder="변경할 이메일을 입력해주세요"
          setInputValue={handleEmailInputChange}
        />
        <div className="button">
          <EditButton name="이메일 수정" onClick={handleEmailChangeClick} />
        </div>
      </EmailContainer>
      {errorAlert && (
        <Alert open={errorAlert} close={closeErrorAlert} name="이메일 에러">
          <EmailErrorAlert onClose={closeErrorAlert} />
        </Alert>
      )}
    </>
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
  .button {
    margin-top: 50px;
  }
`;
export default EmailEdit;
