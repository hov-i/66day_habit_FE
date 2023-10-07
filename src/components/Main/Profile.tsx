import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as Setting } from "../../resources/Icons/settings.svg";
import { ReactComponent as Back } from "../../resources/Icons/profileBack.svg";
import { ReactComponent as PhotoAdd } from "../../resources/Icons/photoAdd.svg";
import PersonList from "./PersonList";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  name: "main" | "edit" | "mypage" | "search";
}

const Profile = ({ name }: ProfileProps) => {
  const { isMobile } = useViewport();
  const navigate = useNavigate();

  return (
    <>
      <ProfileContainer isMobile={isMobile}>
        <BackgroundBox>
          {(name === "edit" || name === "search") && (
            <div className="backButton">
              <Back onClick={() => navigate(-1)} />
            </div>
          )}
          {name === "edit" && (
            <div className="backgroundButton">
              <PhotoAdd />
            </div>
          )}
        </BackgroundBox>
        <ProfileBox>
          <ProfileImg />
          {name === "edit" && (
            <div className="profileButton">
              <PhotoAdd />
            </div>
          )}
          <div className="title">
            <div>
              <div className="name">닉네임</div>
              <div className="aboutMe">자기소개 입니다.</div>
            </div>
            {(name === "main" || name === "mypage") && (
              <div className="setting" onClick={() => navigate("/edit")}>
                <Setting />
              </div>
            )}
          </div>
          {name === "main" && <PersonList />}
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

  .backButton {
    padding: 30px;
  }

  .backgroundButton {
    width: 100%;
    display: flex;
    margin: 0;
    justify-content: right;
    align-items: right;
    padding-right: 20px;
  }
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
  .profileButton {
    position: absolute;
    top: 50%;
    margin-top: -30px;
    margin-left: 110px;
    z-index: 99;
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
