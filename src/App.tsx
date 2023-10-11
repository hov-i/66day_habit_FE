import React from "react";
import { Route, Routes } from "react-router";
import HelpPage from "./pages/HelpPage";
import MainPage from "./pages/MainPage";
import SignPage from "./pages/SignUpPage";
import GlobalStyle from "./style/GlobalStyle";
import LoginPage from "./pages/LoginPage";
import ProfileEditPage from "./pages/ProfileEditPage";
import MyPage from "./pages/MyPage";
import CommendPage from "./pages/CommendPage";
import SearchPage from "./pages/SearchPage";
import "./style/GlobalFont.css";
function App() {
  return (
    <>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/help" element={<HelpPage />} />
        <Route path="/signup" element={<SignPage />} />
        <Route path="/main" element={<MainPage />} />
        <Route path="/edit" element={<ProfileEditPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/commend" element={<CommendPage />} />
        <Route path="/search" element={<SearchPage />} />
      </Routes>
    </>
  );
}

export default App;
