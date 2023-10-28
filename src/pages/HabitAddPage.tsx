import React, { useState } from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Container from "../components/common/Container";
import Navbar from "../components/common/NavBar";
import { ReactComponent as Back } from "../resources/Icons/back.svg";
import { ReactComponent as Add } from "../resources/Icons/addBlack.svg";
import BackGroundColorEdit from "../components/HabitEdit/BackGroundColorEdit";
import TextEditBox from "../components/common/TextEditBox";
import TagEditBox from "../components/HabitEdit/TagEditBox";
import FontColorEdit from "../components/HabitEdit/FontColorEdit";
import DisclosureSelect from "../components/HabitEdit/DisclosureSelect";
import { useNavigate } from "react-router-dom";
import AxiosAPI from "../api/AxiosAPI";
import Alert from "../components/common/Alert";
import AddErrorAlert from "./AddErrorAlert";

const HabitAddPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [BgColor, setBgColor] = useState<string>("");
  const [fontColor, setFontColor] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [addErrorAlert, setAddArrorAlert] = useState<boolean>(false);
  const [disclosure, setDisclosure] = useState<string>("PUBLIC");

  const handleHabitNameInputChange = (value: string) => {
    setName(value);
  };
  const handleHabitFontSeletorChange = (value: string) => {
    setFontColor(value);
  };
  const handleHabitBgColortSeletorChange = (value: string) => {
    setBgColor(value);
  };
  const handleHabitDisclosureSeletorChange = (value: string) => {
    setDisclosure(value);
  };
  const handleHabitTagChange = (value: string[]) => {
    setTags(value);
  };
  const openAddErrorAlert = () => {
    setAddArrorAlert(true);
  };

  const closeAddErrorAlert = () => {
    setAddArrorAlert(false);
  };
  const handleCreateClick = () => {
    if (name !== "" && BgColor !== "" && fontColor !== "") {
      const postHabitCreate = async () => {
        try {
          const response = await AxiosAPI.habitCreate(
            BgColor,
            fontColor,
            name,
            disclosure,
            tags
          );
          if (response && response.status === 200) {
            console.log("습관 생성 성공");
            navigate(-1);
          }
        } catch (error) {
          console.error(error);
        }
      };
      postHabitCreate();
    } else {
      openAddErrorAlert();
    }
  };

  return (
    <>
      <Box>
        <Container>
          <HabitAddContainer>
            <RemoteButtonContainer>
              <Back
                onClick={() => {
                  navigate(-1);
                }}
              />
              <Add onClick={handleCreateClick} />
            </RemoteButtonContainer>
            <HabitEditContainer>
              <BackGroundColorEdit
                setSeletValue={handleHabitBgColortSeletorChange}
              />
              <FontColorEdit setSeletValue={handleHabitFontSeletorChange} />
              <TextEditBox
                name="습관 이름"
                placeholder="습관 이름을 입력해주세요."
                setInputValue={handleHabitNameInputChange}
              />
              <TagEditBox
                name="태그 목록"
                placeholder="태그를 입력하고 엔터를 눌러주세요."
                setTagValue={handleHabitTagChange}
              />
              <DisclosureSelect
                setSeletValue={handleHabitDisclosureSeletorChange}
              />
            </HabitEditContainer>
          </HabitAddContainer>
          <Navbar />
        </Container>
      </Box>
      {addErrorAlert && (
        <Alert open={addErrorAlert} close={closeAddErrorAlert} name="빈칸 오류">
          <AddErrorAlert onClose={closeAddErrorAlert} />
        </Alert>
      )}
    </>
  );
};
const HabitAddContainer = styled.div`
  height: 100%;
  width: 100%;
`;
const RemoteButtonContainer = styled.div`
  width: 100%;
  display: flex;
  padding: 30px;
  align-items: center;
  justify-content: space-between;
`;
const HabitEditContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;
export default HabitAddPage;
