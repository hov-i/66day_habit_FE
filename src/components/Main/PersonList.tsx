import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { ReactComponent as PersonAdd } from "../../resources/Icons/personAdd.svg";
import AxiosAPI from "../../api/AxiosAPI";
import { useRecoilState } from "recoil";
import { friendInfoState, memberIdState } from "../../util/habitState";
import { ProfileProps } from "../../util/types";
import Modal from "../common/Modal";
import PersonAddEdit from "./PersonAddEdit";

const PersonList = ({ userName, profileImage }: ProfileProps) => {
  const [friendInfoData, setFriendInfoData] = useRecoilState(friendInfoState);
  const [selectId, setSelectId] = useRecoilState(memberIdState);
  const [personAddModal, setPersonAddModal] = useState<boolean>(false);
  const openPersonAddModal = () => {
    setPersonAddModal(true);
  };

  const closePersonAddModal = () => {
    setPersonAddModal(false);
    window.location.reload();
  };
  useEffect(() => {
    const getfriendInfo = async () => {
      try {
        const response = await AxiosAPI.friendInfo();
        if (response.status === 200) setFriendInfoData(response.data.data);
        console.log(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getfriendInfo();
  }, [setFriendInfoData, setSelectId]);

  const handleOnclickUser = () => {
    setSelectId(0);
  };

  const handleOnclickFreind = (e: number) => {
    setSelectId(e);
    console.log(e);
  };
  return (
    <>
      <List>
        {userName ? (
          <Person
            $profileUrl={profileImage ? profileImage : ""}
            onClick={handleOnclickUser}
            $memberId={0}
            $selectId={selectId}
          >
            <div className="personImg" />
            <p className="personName">{userName}</p>
          </Person>
        ) : null}

        {friendInfoData?.map((data, index) => (
          <Person
            key={index}
            $memberId={data?.memberId || 0}
            $selectId={selectId}
            $profileUrl={data?.profileImage || ""}
            onClick={() => handleOnclickFreind(data.memberId)}
          >
            <div className="personImg" />
            <p className="personName">{data.username}</p>
          </Person>
        ))}

        <div className="personAdd">
          <PersonAdd onClick={openPersonAddModal} />
        </div>
      </List>
      {personAddModal && (
        <Modal
          open={personAddModal}
          close={closePersonAddModal}
          name="사용자추가"
          height="300px"
        >
          <PersonAddEdit />
        </Modal>
      )}
    </>
  );
};

const List = styled.div`
  display: flex;
  padding-left: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  border-bottom: 1px solid #c7c7c7;

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

const Person = styled.div<{
  $profileUrl: string;
  $memberId: number;
  $selectId: number;
}>`
  justify-content: center;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 12px;

  .personImg {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background-image: url(${(props) => props.$profileUrl});

    background-size: cover;
    background-position: center;
  }
  .personName {
    font-size: 16px;
    color: ${(props) =>
      props.$memberId === props.$selectId ? "black" : "#747474"};
    margin: 0;
    font-weight: ${(props) =>
      props.$memberId === props.$selectId ? "bolder" : "nomal"};
  }
`;
export default PersonList;
