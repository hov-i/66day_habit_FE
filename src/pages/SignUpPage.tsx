import React from "react";
import Box from "../components/common/Box";
import styled from "styled-components";
import { ReactComponent as Back } from "../resources/Icons/back.svg";
import { Link } from "react-router-dom";

const SignPage = () => {
  return (
    <Box>
      <SignUpContainer>
        <div className="backButton">
          <Link to="/login">
            <Back />
          </Link>
        </div>

        <div className="container">
          <div className="bubble">
            만나서 반가워요!
            <br />
            당신의 이름은 무엇인가요?
          </div>
        </div>
      </SignUpContainer>
    </Box>
  );
};

const SignUpContainer = styled.div`
  height: 100vh;
  margin: 0 auto;
  width: 100%;

  .container {
    display: flex;
    padding: 30px;
  }

  .backButton {
    padding: 30px;
  }

  .bubble {
    position: relative;
    background: #363636;
    border-radius: 0.9em;
    padding: 30px;
    font-size: 16px;
    color: white;
  }

  .bubble:after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 15%;
    width: 0;
    height: 0;
    border: 32px solid transparent;
    border-top-color: #363636;
    border-bottom: 0;
    border-left: 0;
    margin-left: -16px;
    margin-bottom: -32px;
  }
`;

export default SignPage;
