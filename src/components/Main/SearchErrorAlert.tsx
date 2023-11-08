import React from "react";
import styled from "styled-components";
import EditButton from "../MyPage/EditButton";
import { ErrorProps } from "../../util/types";

const SearchErrorAlert = ({ onClose }: ErrorProps) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <AlertContainer>
        <div className="name">검색 키워드를 작성해주세요</div>
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

  .name {
    margin: 0;
    font-size: 16px;
  }

  .button {
    width: 100%;
    margin: 0;
    display: flex;
    margin-top: 50px;
    align-items: center;
    justify-content: center;
  }
`;
export default SearchErrorAlert;
