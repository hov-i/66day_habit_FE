import React from "react";
import styled from "styled-components";

const Profile = () => {
  return (
    <>
      <ProfileContainer>
        <BackgroundBox />
        <ProfileBox />{" "}
      </ProfileContainer>
    </>
  );
};

const ProfileContainer = styled.div`
  position: fixed;
  width: 500px;
  height: 300px;
`;
const BackgroundBox = styled.div`
  width: 100%;
  height: 15%;
  background-color: #363636;
`;

const ProfileBox = styled.div`
  width: 100%;
  height: 20%;
  border-bottom: 1px solid #c7c7c7;
  background-color: white;
`;
export default Profile;
