import React, { useEffect } from "react";
import styled from "styled-components";
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
} from "../util/habitState";
import { useRecoilState, useRecoilValue } from "recoil";

const MainPage = () => {
  const [userHabitInfoData, setUserHabitInfoData] =
    useRecoilState(userHabitInfoState);
  const [memberHabitInfoData, setMemberHabitInfoData] =
    useRecoilState(memberHabitInfoState);
  const friendInfoData = useRecoilValue(friendInfoState);
  const [selectId, setSelectId] = useRecoilState(memberIdState);

  useEffect(() => {
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
  ]);
  return (
    <Box>
      <MainContainer>
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
      </MainContainer>
    </Box>
  );
};

const MainContainer = styled.div`
  width: 100%;
  height: 100vh;
`;

const HabitContainer = styled.div`
  width: 80%;
`;

export default MainPage;
