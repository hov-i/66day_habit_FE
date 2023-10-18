import React, { useState } from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Logo from "../resources/66dayIcon.png";
import { ReactComponent as Help } from "../resources/Icons/help.svg";
import useViewport from "../util/viewportHook";
import TextBox from "../components/Login/TextBox";
import { Link, useNavigate } from "react-router-dom";
import AxiosAPI from "../api/AxiosAPI";
import Alert from "../components/common/Alert";
import LoginErrorAlert from "../components/Login/LoginErrorAlert";

const LoginPage = () => {
  const { isMobile } = useViewport();
  const navigate = useNavigate();
  const [inputEmail, setInputEmail] = useState("");
  const [inputPwd, setInputPwd] = useState("");
  const [loginErrorAlert, setLoginErrorAlert] = useState(false);

  const handleEmailInputChange = (value: string) => {
    setInputEmail(value);
  };

  const handlePasswordInputChange = (value: string) => {
    setInputPwd(value);
  };

  const openLoginErrorAlert = () => {
    setLoginErrorAlert(true);
  };

  const closeLoginErrorAlert = () => {
    setLoginErrorAlert(false);
  };

  const handleHelpClick = () => {
    navigate("/help");
  };

  const handleLoginClick = () => {
    const postLogin = async () => {
      try {
        console.log(inputEmail, inputPwd);
        const response = await AxiosAPI.login(inputEmail, inputPwd);
        if (response.status === 200) {
          console.log("로그인 성공");
          navigate("/main");
        }
      } catch (error) {
        openLoginErrorAlert();
      }
    };
    postLogin();
  };

  return (
    <>
      <Box>
        <BackGroundBox>
          <LoginContainer isMobile={isMobile}>
            <button className="helpButton" onClick={handleHelpClick}>
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
              <TextBox name="이메일" setInputValue={handleEmailInputChange} />
              <TextBox
                name="비밀번호"
                setInputValue={handlePasswordInputChange}
              />
              <button className="loginButton" onClick={handleLoginClick}>
                로그인
              </button>

              <div className="signUpButton">
                <Link to="/signup">회원가입</Link>
              </div>
            </div>
          </LoginContainer>
        </BackGroundBox>
      </Box>
      {loginErrorAlert && (
        <Alert
          open={loginErrorAlert}
          close={closeLoginErrorAlert}
          name="로그인에러"
        >
          <LoginErrorAlert />
        </Alert>
      )}
    </>
  );
};

const LoginContainer = styled.div<{ isMobile: boolean }>`
  height: 100vh;
  margin: 0 auto;
  width: 100%;
  overflow: hidden;
  position: relative;

  .signUpButton {
    text-align: right;
    margin: 20px;
    margin-left: 0px;
    font-size: 16px;
    padding-right: 30px;
    margin-bottom: ${({ isMobile }) => (isMobile ? "20px" : "4%")};
    width: ${({ isMobile }) => (isMobile ? "80%" : "465px")};

    a {
      text-decoration: none;
      color: #8d8d8d;
      transition: color 0.3s;

      &:hover {
        color: black;
      }
    }
  }
  .loginButton {
    width: ${({ isMobile }) => (isMobile ? "70%" : "400px")};
    border-radius: 10px;
    background-color: #363636;
    color: white;
    text-align: center;
    font-size: 16px;
    margin-top: 10px;
    border: 0;
    height: 60px;
    &.disalbe {
      background-color: #707070;
    }
  }

  .loginBox {
    display: flex;
    justify-content: center;
    width: 100%;
    align-items: center;
    flex-direction: column;
    position: absolute;
    bottom: 0;
    padding-bottom: 20px;
  }
  .mainTitle {
    font-size: 4vh;
    margin: 5%;
    margin-left: 10%;
    margin-bottom: 0px;
    font-family: "Noto Sans Bold";
  }

  .subTitle {
    font-size: 2vh;
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
      width: 7%;
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
