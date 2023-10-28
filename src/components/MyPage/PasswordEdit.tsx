import React, { useState } from "react";
import styled from "styled-components";
import TextEditBox from "../common/TextEditBox";
import EditButton from "./EditButton";
import AxiosAPI from "../../api/AxiosAPI";
import Alert from "../common/Alert";
import PwdErrorAlert from "./PwdErrorAlert";

const PasswordEdit = () => {
  const [inputNowPwd, setInputNowPwd] = useState<string>("");
  const [inputNewPwd, setInputNewPwd] = useState<string>("");
  const [errorAlert, setErrorAlert] = useState<boolean>(false);
  const [errorName, setErrorName] = useState<string>("");
  const openErrorAlert = () => {
    setErrorAlert(true);
  };

  const closeErrorAlert = () => {
    setErrorAlert(false);
  };

  const handleNowPwdInputChange = (value: string) => {
    setInputNowPwd(value);
  };

  const handleNewPwdInputChange = (value: string) => {
    setInputNewPwd(value);
  };

  const handlePwdChangeClick = () => {
    const putPwdChange = async () => {
      try {
        const response = await AxiosAPI.userPwdChange(inputNowPwd, inputNewPwd);
        if (response.status === 200) {
          console.log("비밀번호 수정 성공");
          window.location.reload();
        }
      } catch (error: any) {
        if (error.response && error.response.status === 400) {
          setErrorName("빈칸 입력");
        } else if (error.response && error.response.status === 403) {
          setErrorName("비밀번호 불일치");
        }
        console.log(error);
        openErrorAlert();
      }
    };
    putPwdChange();
  };

  return (
    <>
      <EmailContainer>
        <TextEditBox
          title="현재 비밀번호"
          placeholder="현재 비밀번호를 입력해주세요"
          setInputValue={handleNowPwdInputChange}
        />
        <TextEditBox
          title="변경 비밀번호"
          placeholder="변경 비밀번호를 입력해주세요"
          setInputValue={handleNewPwdInputChange}
        />
        <EditButton name="비밀번호 수정" onClick={handlePwdChangeClick} />
      </EmailContainer>
      {errorAlert && (
        <Alert open={errorAlert} close={closeErrorAlert} name="비밀번호 에러">
          <PwdErrorAlert onClose={closeErrorAlert} errorCode={errorName} />
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
`;
export default PasswordEdit;
