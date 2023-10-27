import React from "react";
import styled from "styled-components";
import EditButton from "../components/MyPage/EditButton";

interface ErrorProps {
  onClose: () => void;
}
const AddErrorAlert = ({ onClose }: ErrorProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <AlertContainer>
        <div className="name">입력값을 모두 채워주세요.</div>
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
export default AddErrorAlert;
