import React from "react";
import styled from "styled-components";
import Profile from "../components/Main/Profile";
import Container from "../components/common/Container";
import Box from "../components/common/Box";
import ContentContainer from "../components/common/CotentContainer";
import TextEditBox from "../components/common/TextEditBox";
import Navbar from "../components/common/NavBar";

const ProfileEditPage = () => {
  return (
    <>
      <Box>
        <Container>
          <EditContainer>
            <Profile name="edit" />
            <ContentContainer name="edit">
              <TextEditBox name="별명" placeholder="이름을 입력해주세요" />
              <TextEditBox
                name="자기소개"
                placeholder="자기소개를 입력해주세요"
              />
              <Navbar />
            </ContentContainer>
          </EditContainer>
        </Container>
      </Box>
    </>
  );
};

const EditContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100vh;
`;
export default ProfileEditPage;
