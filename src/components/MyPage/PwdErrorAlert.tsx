import React from "react";
import styled from "styled-components";
import EditButton from "../MyPage/EditButton";

interface ErrorProps {
  onClose: () => void;
  errorCode: string;
}
const PwdErrorAlert = ({ onClose, errorCode }: ErrorProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <AlertContainer>
        <div className="name">
          {errorCode === "빈칸 입력"
            ? "비밀번호를 확인해주세요."
            : "현재 비밀번호가 일치하지 않습니다."}
        </div>
        <div className="button">
          <EditButton name="확인" onClick={handleClose} />
        </div>
      </AlertContainer>
    </>
  );
};

const AlertContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 30px;
  font-size: 16px;

  .name {
    margin: 0;
    font-weight: bold;
  }

  .button {
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cancel {
    padding: 8px;
    width: 60px;
    text-align: center;
    font-size: 16px;
    color: #363636;
    margin-top: 50px;
    background-color: white;
    border-radius: 8px;
    border: 1px solid #363636;
    cursor: pointer;
  }
`;
export default PwdErrorAlert;
