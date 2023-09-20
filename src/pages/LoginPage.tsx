import React from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Logo from "../resources/66dayIcon.png";

const LoginPage = () => {
  return (
    <Box>
      <LoginContainer>
        <div className="mainTitle">
          기적을 보여주는
          <br /> 매일의 힘 <br />
          66일의 기적
        </div>
      </LoginContainer>
    </Box>
  );
};

const LoginContainer = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  width: 100%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  .mainTitle {
    font-size: 40px;
    font-weight: bolder;
  }
`;

const BackGroundBox = styled.div`
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
`;

export default LoginPage;
