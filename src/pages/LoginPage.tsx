import React from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Logo from "../resources/66dayIcon.png";
import { ReactComponent as Help } from "../resources/Icons/help.svg";
import useViewport from "../util/viewportHook";
import TextBox from "../components/Login/TextBox";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { isMobile } = useViewport();
  return (
    <Box>
      <BackGroundBox>
        <LoginContainer isMobile={isMobile}>
          <button className="helpButton">
            <Help />
          </button>
          <div>
            <div className="mainTitle">
              기적을 보여주는
              <br /> 매일의 힘 <br />
              66일의 기적
            </div>
            <div className="subTitle">지금 시작해보세요!</div>
          </div>

          <div className="loginBox">
            <TextBox name="이메일" />
            <TextBox name="비밀번호" />
            <button className="loginButton">로그인</button>
            <div className="signUpButton">
              <Link to="/singup">회원가입</Link>
            </div>
          </div>
        </LoginContainer>
      </BackGroundBox>
    </Box>
  );
};

const LoginContainer = styled.div<{ isMobile: boolean }>`
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;

  .signUpButton {
    text-align: right;
    margin: 20px;
    font-size: 16px;
    padding-right: 10px;
    margin-bottom: ${({ isMobile }) => (isMobile ? "20px" : "4%")};
    width: ${({ isMobile }) => (isMobile ? "80%" : "465px")};

    a {
      /* <Link>에 스타일 적용 */
      text-decoration: none; /* 링크 텍스트 밑줄 제거 */
      color: #8d8d8d; /* 링크 텍스트 색상 설정 */
      transition: color 0.3s; /* 링크 색상 변화 애니메이션 설정 */

      &:hover {
        color: black; /* 호버 시 링크 색상 변경 */
      }
    }
  }
  .loginButton {
    width: ${({ isMobile }) => (isMobile ? "80%" : "465px")};
    border-radius: 10px;
    background-color: #363636;
    color: white;
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
    border: 0;
    height: 70px;
  }

  .loginBox {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    position: absolute; /* 추가: loginBox를 absolute로 설정 */
    bottom: 0; /* 추가: 화면 하단에 배치 */
    left: 50%; /* 추가: 가운데 정렬을 위해 left 값을 조정합니다. */
    transform: translateX(-50%); /* 추가: 가운데 정렬을 위한 수평 이동 */
    padding: 20px;
    width: 100%;
  }
  .mainTitle {
    font-size: 45px;
    margin: 5%;
    margin-left: 10%;
    margin-bottom: 0px;
    font-family: "Noto Sans Bold";
  }

  .subTitle {
    font-size: 25px;
    margin: 10%;
    margin-top: 20px;
  }

  .helpButton {
    width: 100%;
    display: flex;
    justify-content: right;
    margin-top: 40px;
    margin-left: -40px;
    > svg {
      width: ${({ isMobile }) => (isMobile ? "45px" : "60px")};
    }
  }
`;

const BackGroundBox = styled.div`
  width: 100%;
  height: 100vh;
  background-image: url(${Logo});
  background-size: 80%;
  background-repeat: no-repeat;
  background-position: 160%;
`;

export default LoginPage;
