import React from "react";
import styled from "styled-components";
import EditButton from "./EditButton";
import WhiteEditButton from "./WhiteEditButton";
import { ErrorProps } from "../../util/types";
import AxiosAPI from "../../api/AxiosAPI";

const LogOutAlert = ({ onClose }: ErrorProps) => {
  const handleClose = () => {
    onClose();
  };
  const hanldeLogoutClick = () => {
    const postLogout = async () => {
      try {
        const response = await AxiosAPI.logout();
        if (response.status === 200) {
          window.location.href = "/";
        }
      } catch (error) {
        console.log(error);
      }
    };
    postLogout();
  };
  return (
    <>
      <AlertContainer>
        <div className="name">정말 로그아웃 하시겠습니까?</div>
        <div className="button">
          <EditButton name="로그아웃" onClick={hanldeLogoutClick} />
          <WhiteEditButton name="취소" onClick={handleClose} />
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
    margin-top: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
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
export default LogOutAlert;
