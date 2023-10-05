import React from "react";
import styled from "styled-components";
import { ReactComponent as PersonAdd } from "../../resources/Icons/personAdd.svg";

const PersonList = () => {
  return (
    <List>
      <div className="person">
        <div className="personImg" />
        <p className="personName">이름</p>
      </div>
      <div className="person">
        <div className="personImg" />
        <p className="personName">이름</p>
      </div>

      <div className="personAdd">
        <PersonAdd />
      </div>
    </List>
  );
};

const List = styled.div`
  display: flex;
  padding-left: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #c7c7c7;
  .person {
    justify-content: center;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin: 12px;
  }
  .personImg {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #d9d9d9;
  }
  .personName {
    font-size: 16px;
    margin: 0;
  }
  .personAdd {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-color: #e8e8e8;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 15px;
  }
`;
export default PersonList;
