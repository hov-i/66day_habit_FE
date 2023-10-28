import React, { useState } from "react";
import styled from "styled-components";
import TextEditBox from "../common/TextEditBox";
import EditButton from "./EditButton";
import AxiosAPI from "../../api/AxiosAPI";
import Alert from "../common/Alert";
import PwdErrorAlert from "./PwdErrorAlert";

const DeleteEdit = () => {
  const [inputPwd, setInputPwd] = useState<string>("");
  const [errorAlert, setErrorAlert] = useState<boolean>(false);

  const handlePwdInputChange = (value: string) => {
    setInputPwd(value);
  };
  const openErrorAlert = () => {
    setErrorAlert(true);
  };

  const closeErrorAlert = () => {
    setErrorAlert(false);
  };

  const handleUserDeleteClick = () => {
    const deleteUser = async () => {
      try {
        const response = await AxiosAPI.userDelete(inputPwd);
        if (response.status === 200) {
          console.log("회원 탈퇴 성공");
          window.location.href = "/";
        }
      } catch (error: any) {
        console.log(error);
        if (error.response && error.response.status === 403) {
          console.log(error);
          openErrorAlert();
        }
      }
    };
    deleteUser();
  };

  return (
    <>
      <EmailContainer>
        <TextEditBox
          title="비밀번호를 입력해주세요"
          placeholder="가입된 비밀번호를 입력해주세요"
          setInputValue={handlePwdInputChange}
        />
        <EditButton name="회원 탈퇴" onClick={handleUserDeleteClick} />
      </EmailContainer>
      {errorAlert && (
        <Alert open={errorAlert} close={closeErrorAlert} name="비밀번호 에러">
          <PwdErrorAlert onClose={closeErrorAlert} errorCode="빈칸 입력" />
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
export default DeleteEdit;
