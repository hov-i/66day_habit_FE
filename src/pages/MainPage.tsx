import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import "react-toastify/dist/ReactToastify.css";
import { ReactComponent as Check } from "../resources/Icons/check.svg";
import Box from "../components/common/Box";
import Navbar from "../components/common/NavBar";
import Profile from "../components/Main/Profile";
import HabitBox from "../components/Main/HabitBox";
import Container from "../components/common/Container";
import LifeQuotes from "../components/Main/LifeQuotes";
import HabitAddButton from "../components/Main/HabitAddButton";
import ContentContainer from "../components/common/CotentContainer";
import AxiosAPI from "../api/AxiosAPI";
import {
  memberIdState,
  memberHabitInfoState,
  userHabitInfoState,
  friendInfoState,
  habitNameState,
  habitMessage,
  userIdState,
} from "../util/habitState";
import { toast, ToastContainer } from "react-toastify";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import useViewport from "../util/viewportHook";

const MainPage = () => {
  const { isMobile } = useViewport();
  const [userHabitInfoData, setUserHabitInfoData] =
    useRecoilState(userHabitInfoState);
  const [memberHabitInfoData, setMemberHabitInfoData] =
    useRecoilState(memberHabitInfoState);
  const friendInfoData = useRecoilValue(friendInfoState);
  const [selectId, setSelectId] = useRecoilState(memberIdState);
  const setUserId = useSetRecoilState(userIdState);
  const [habitMessageDate, sethabitMessageDate] = useRecoilState(habitMessage);
  const [habitNameDateState, sethabitNameDateState] =
    useRecoilState(habitNameState);

  const today = new Date();
  const formattedDate = `${today.getFullYear()}/ ${
    today.getMonth() + 1
  }/ ${today.getDate()}  ${today.getHours()}:${today.getMinutes()}`;
  const habitCreate = useCallback(() => {
    toast(
      <div className="messeageBox">
        <Check />
        <div>
          "{habitNameDateState}" 습관이 생성되었습니다!
          <br />
          {formattedDate}
        </div>
      </div>
    );
  }, [habitNameDateState, formattedDate]);
  const habitPatch = useCallback(() => {
    toast(
      <div className="messeageBox">
        <Check />
        <div>
          "{habitNameDateState}" 습관이 수정되었습니다!
          <br />
          {formattedDate}
        </div>
      </div>
    );
  }, [habitNameDateState, formattedDate]);
  const habitDelete = useCallback(() => {
    toast(
      <div className="messeageBox">
        <Check />
        <div>
          "{habitNameDateState}" 습관이 삭제되었습니다!
          <br />
          {formattedDate}
        </div>
      </div>
    );
  }, [habitNameDateState, formattedDate]);

  useEffect(() => {
    if (habitMessageDate === "create") {
      habitCreate();
      sethabitMessageDate("");
      sethabitNameDateState("");
    } else if (habitMessageDate === "patch") {
      habitPatch();
      sethabitMessageDate("");
      sethabitNameDateState("");
    } else if (habitMessageDate === "delete") {
      habitDelete();
      sethabitMessageDate("");
      sethabitNameDateState("");
    }
    const matchingFriendInfo = friendInfoData.find(
      (info) => info.memberId === selectId
    );

    if (!matchingFriendInfo) {
      setSelectId(0);
    }
    const getMyInfo = async () => {
      try {
        const response = await AxiosAPI.mainUserInfo();
        if (response.status === 200)
          setUserHabitInfoData(response.data.data.habitList);
        console.log(response.data.data.habitList);
      } catch (e) {
        console.log(e);
      }
    };
    getMyInfo();

    const getUserId = async () => {
      try {
        const response = await AxiosAPI.userId();
        if (response.status === 200) {
          setUserId(response.data.data.memberId);
          console.log(response.data.data.memberId);
        }
      } catch (e) {
        console.log(e);
      }
    };

    getUserId();

    if (selectId !== 0) {
      const getFriendUserInfo = async () => {
        try {
          const response = await AxiosAPI.friendUserInfo(selectId);
          if (response.status === 200)
            setMemberHabitInfoData(response.data.data.friendHabitList);
          console.log(response.data.data.friendHabitList);
        } catch (e) {
          console.log(e);
        }
      };
      getFriendUserInfo();
    }
  }, [
    setUserHabitInfoData,
    selectId,
    setMemberHabitInfoData,
    setSelectId,
    friendInfoData,
    habitCreate,
    habitMessageDate,
    sethabitNameDateState,
    sethabitMessageDate,
    habitDelete,
    habitPatch,
    setUserId,
  ]);
  return (
    <Box>
      <MainContainer $isMobile={isMobile}>
        <Container>
          {selectId === 0 && <Profile name="main" />}
          {selectId !== 0 && <Profile name="friend" />}

          <Navbar />
          {selectId === 0 && (
            <>
              <ContentContainer name="main">
                <HabitContainer>
                  <LifeQuotes name="main" />
                  {userHabitInfoData?.map((data, index) => (
                    <HabitBox key={index} name="main" habitId={data.habitId} />
                  ))}
                  <HabitAddButton />
                </HabitContainer>
              </ContentContainer>
            </>
          )}
          {selectId !== 0 && (
            <>
              <ContentContainer name="main">
                <HabitContainer>
                  <LifeQuotes name="friend" />
                  {memberHabitInfoData?.map((data, index) => (
                    <HabitBox
                      key={index}
                      name="friend"
                      habitId={data.habitId}
                    />
                  ))}
                </HabitContainer>
              </ContentContainer>
            </>
          )}
        </Container>
        <ToastContainer
          className="toast"
          position="top-center" // 알람 위치 지정
          autoClose={3000} // 자동 off 시간
          hideProgressBar={false} // 진행시간바 숨김
          closeOnClick // 클릭으로 알람 닫기
          rtl={false} // 알림 좌우 반전
          pauseOnFocusLoss // 화면을 벗어나면 알람 정지
          draggable // 드래그 가능
          pauseOnHover // 마우스를 올리면 알람 정지
          theme="light"
          limit={1} // 알람 개수 제한
        />
      </MainContainer>
    </Box>
  );
};

const MainContainer = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  height: 100vh;
  --toastify-toast-width: ${(props) => (props.$isMobile ? "100%" : "768px")};
  --toastify-color-progress-light: #363636;
  --toastify-text-color-light: #363636;

  .messeageBox {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bolder;
    > svg {
      margin-right: 20px;
      --toastify-toast-width: ${(props) =>
        props.$isMobile ? "100%" : "768px"};
    }
  }
`;

const HabitContainer = styled.div`
  width: 80%;
`;

export default MainPage;
