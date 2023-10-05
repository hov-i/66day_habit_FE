import React from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";

const Profile = () => {
  const { isMobile } = useViewport();
  return (
    <>
      <ProfileContainer isMobile={isMobile}>
        <BackgroundBox />
        <ProfileBox>
          <ProfileImg />
          <div className="name">닉네임</div>
        </ProfileBox>
      </ProfileContainer>
    </>
  );
};

const ProfileContainer = styled.div<{ isMobile: boolean }>`
  position: fixed;
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
  border-bottom: 1px solid #c7c7c7;
  background-color: white;

  .name {
    font-weight: bold;
    font-size: 20px;
    margin-top: 80px;
    margin-left: 60px;
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
