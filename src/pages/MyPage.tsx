import React, { useState } from "react";
import styled from "styled-components";
import Container from "../components/common/Container";
import Profile from "../components/Main/Profile";
import Box from "../components/common/Box";
import ContentContainer from "../components/common/CotentContainer";
import useViewport from "../util/viewportHook";
import Navbar from "../components/common/NavBar";
import { ReactComponent as Right } from "../resources/Icons/arrowRight.svg";
import Modal from "../components/common/Modal";
import EmailEdit from "../components/MyPage/EmailEdit";
import PasswordEdit from "../components/MyPage/PasswordEdit";
const MyPage = () => {
  const { isMobile } = useViewport();
  const [emailModalOpen, setEmailModalOpen] = useState(false);
  const [pwdModalOpen, setPwdModalOpen] = useState(false);

  const openEmailModal = () => {
    setEmailModalOpen(true);
  };

  const closeEmailModal = () => {
    setEmailModalOpen(false);
  };

  const openPwdModal = () => {
    setPwdModalOpen(true);
  };

  const closePwdModal = () => {
    setPwdModalOpen(false);
  };

  return (
    <>
      <Box>
        <Container>
          <Profile name="mypage" />
          <ContentContainer name="edit">
            <MyPageContainer isMobile={isMobile}>
              <div>
                이메일
                <p className="email">dbsghdql55555@gmail.com</p>
              </div>
              <div className="editButton" onClick={openEmailModal}>
                이메일 변경
                <Right />
              </div>
              <div className="editButton" onClick={openPwdModal}>
                비밀번호 변경
                <Right />
              </div>
              <div className="logout">로그아웃</div>
              <div className="delete">회원탈퇴</div>
            </MyPageContainer>
            <Navbar />
          </ContentContainer>
        </Container>
      </Box>
      {emailModalOpen && (
        <Modal
          open={emailModalOpen}
          close={closeEmailModal}
          height="400px"
          name="이메일 수정"
        >
          <EmailEdit />
        </Modal>
      )}
      {pwdModalOpen && (
        <Modal
          open={pwdModalOpen}
          close={closePwdModal}
          height="500px"
          name="비밀번호 수정"
        >
          <PasswordEdit />
        </Modal>
      )}
    </>
  );
};

const MyPageContainer = styled.div<{ isMobile: boolean }>`
  width: ${(props) => (props.isMobile ? "75%" : "80%")};
  font-size: 16px;
  .email {
    color: #8f8f8f;
    margin: 0;
    margin-top: 7px;
  }
  .editButton {
    display: flex;
    width: 100%;
    justify-content: space-between;
    margin-top: 40px;
    align-items: center;
  }
  .logout {
    width: 100%;
    margin-top: 50px;
  }
  .delete {
    color: #ff0000;
    margin-top: 100px;
  }
`;

export default MyPage;
