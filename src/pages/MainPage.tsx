import React from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Navbar from "../components/common/NavBar";
import Profile from "../components/Main/Profile";
const LoginPage = () => {
  return (
    <Box>
      <MainContainer>
        <Profile />
        <Navbar />
      </MainContainer>
    </Box>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

export default LoginPage;
