import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Navbar from "../components/common/NavBar";
import Profile from "../components/Main/Profile";
import HabitBox from "../components/Main/HabitBox";
import Container from "../components/common/Container";
import LifeQuotes from "../components/Main/LifeQuotes";
import ContentContainer from "../components/common/CotentContainer";
import AxiosAPI from "../api/AxiosAPI";
import {
  memberIdState,
  memberHabitInfoState,
  userHabitInfoState,
} from "../util/habitState";
import { useRecoilState, useRecoilValue } from "recoil";

const UserMainPage = () => {
  const [isUser, setIsUser] = useState<boolean>(false);
  const [selectId, setSelectId] = useRecoilState(memberIdState);
  const [memberHabitInfoData, setMemberHabitInfoData] =
    useRecoilState(memberHabitInfoState);
  const userHabitInfoData = useRecoilValue(userHabitInfoState);
  useEffect(() => {
    if (
      userHabitInfoData?.length > 0 &&
      userHabitInfoData[0].memberId === selectId
    ) {
      console.log(userHabitInfoData[0].memberId);
      setIsUser(true);
      setSelectId(userHabitInfoData[0].memberId);
    } else setIsUser(false);
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
  }, [selectId, setMemberHabitInfoData, userHabitInfoData, setSelectId]);

  return (
    <Box>
      <MainContainer>
        <Container>
          {isUser && <Profile name="main" />}
          {!isUser && <Profile name="search" />}

          <Navbar />
          <>
            <ContentContainer name="edit">
              <HabitContainer>
                <LifeQuotes name="friend" />
                {isUser &&
                  userHabitInfoData?.map((data, index) => (
                    <HabitBox
                      key={index}
                      name="friend"
                      habitId={data.habitId}
                    />
                  ))}
                {!isUser &&
                  memberHabitInfoData?.map((data, index) => (
                    <HabitBox
                      key={index}
                      name="friend"
                      habitId={data.habitId}
                    />
                  ))}
              </HabitContainer>
            </ContentContainer>
          </>
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

export default UserMainPage;
