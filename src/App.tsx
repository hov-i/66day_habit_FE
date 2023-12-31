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
import HabitAddPage from "./pages/HabitAddPage";
import { RecoilRoot } from "recoil";
import HabitDetailPage from "./pages/HabitDetailPage";
import UserMainPage from "./pages/UserMainPage";
import ChattingPage from "./pages/ChattingPage";
import ToastList from "./components/common/ToastList";

function App() {
  return (
    <>
      <RecoilRoot>
        <GlobalStyle />
        <ToastList />
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/signup" element={<SignPage />} />
          <Route path="/main" element={<MainPage />} />
          <Route path="/edit" element={<ProfileEditPage />} />
          <Route path="/chatting" element={<ChattingPage />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/commend" element={<CommendPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/habit/add" element={<HabitAddPage name="add" />} />
          <Route path="/habit/edit" element={<HabitAddPage name="edit" />} />
          <Route path="/habit/detail" element={<HabitDetailPage />} />
          <Route path="/user/profile" element={<UserMainPage />} />
        </Routes>
      </RecoilRoot>
    </>
  );
}

export default App;
