import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Profile from "../components/Main/Profile";
import Container from "../components/common/Container";
import Box from "../components/common/Box";
import ContentContainer from "../components/common/CotentContainer";
import TextEditBox from "../components/common/TextEditBox";
import Navbar from "../components/common/NavBar";
import AxiosAPI from "../api/AxiosAPI";
import { InfoData } from "../util/types";

const ProfileEditPage = () => {
  const [InfoData, setInfoData] = useState<InfoData | null>(null);
  const [inputUserName, setInputUserName] = useState<string>("");
  const [inputIntroduction, setInputIntroduction] = useState<string>("");

  const handleUserNameInputChange = (value: string) => {
    setInputUserName(value);
  };

  const handleIntroductionInputChange = (value: string) => {
    setInputIntroduction(value);
  };

  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const response = await AxiosAPI.mainUserInfo();
        if (response.status === 200) setInfoData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMyInfo();
  }, []);

  return (
    <>
      <Box>
        <Container>
          <EditContainer>
            <Profile
              name="edit"
              userName={inputUserName || InfoData?.username}
              Introduction={inputIntroduction || InfoData?.introduction}
            />
            <ContentContainer name="edit">
              {InfoData && (
                <>
                  <TextEditBox
                    title="별명"
                    placeholder="별명을 입력해주세요"
                    setInputValue={handleUserNameInputChange}
                  />
                  <TextEditBox
                    title="자기소개"
                    placeholder="자기소개를 입력해주세요!"
                    setInputValue={handleIntroductionInputChange}
                  />
                </>
              )}
              <Navbar />
            </ContentContainer>
          </EditContainer>
        </Container>
      </Box>
    </>
  );
};

const EditContainer = styled.div`
  width: 100%;
  overflow: hidden;
  height: 100vh;
`;
export default ProfileEditPage;
