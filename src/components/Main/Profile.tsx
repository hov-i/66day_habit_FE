import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as Setting } from "../../resources/Icons/settings.svg";
import PersonList from "./PersonList";

interface ProfileProps {
  name: "main" | "edit" | "mypage" | "search";
}

const Profile = () => {
  const { isMobile } = useViewport();
  return (
    <>
      <ProfileContainer isMobile={isMobile}>
        <BackgroundBox />
        <ProfileBox>
          <ProfileImg />
          <div className="title">
            <div>
              <div className="name">닉네임</div>
              <div className="aboutMe">자기소개 입니다.</div>
            </div>
            <div className="setting">
              <Setting />
            </div>
          </div>
          <PersonList />
        </ProfileBox>
      </ProfileContainer>
    </>
  );
};

const ProfileContainer = styled.div<{ isMobile: boolean }>`
  position: relative;
  width: ${({ isMobile }) => (isMobile ? "100%" : "768px")};
  height: 300px;
`;
const BackgroundBox = styled.div`
  width: 100%;
  height: 170px;
  background-color: #363636;
`;

const ProfileBox = styled.div`
  width: 100%;

  background-color: white;

  .name {
    font-weight: bold;
    font-size: 20px;
    margin-left: 60px;
  }
  .aboutMe {
    font-size: 16px;
    margin-left: 60px;
    margin-top: 7px;
  }
  .setting {
    margin-right: 60px;
  }
  .title {
    align-items: center;
    margin-top: 85px;
    display: flex;
    justify-content: space-between;
  }
  .list {
  }
`;

const ProfileImg = styled.div`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -30px;
  margin-left: 30px;
  background-color: #d9d9d9;
`;
export default Profile;
