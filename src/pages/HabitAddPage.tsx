import React, { useState } from "react";
import styled from "styled-components";
import Box from "../components/common/Box";
import Container from "../components/common/Container";
import Navbar from "../components/common/NavBar";
import { ReactComponent as Back } from "../resources/Icons/back.svg";
import { ReactComponent as Add } from "../resources/Icons/addBlack.svg";
import { ReactComponent as Edit } from "../resources/Icons/change.svg";
import BackGroundColorEdit from "../components/HabitEdit/BackGroundColorEdit";
import TextEditBox from "../components/common/TextEditBox";
import TagEditBox from "../components/HabitEdit/TagEditBox";
import FontColorEdit from "../components/HabitEdit/FontColorEdit";
import DisclosureSelect from "../components/HabitEdit/DisclosureSelect";
import { useNavigate } from "react-router-dom";
import AxiosAPI from "../api/AxiosAPI";
import Alert from "../components/common/Alert";
import AddErrorAlert from "./AddErrorAlert";
import { HabitAddProps } from "../util/types";
import { useRecoilValue } from "recoil";
import { habitIdState, habitInfoState } from "../util/habitState";
import useHabitData from "../util/habitInfoHook";

const HabitAddPage: React.FC<HabitAddProps> = ({ name }) => {
  const navigate = useNavigate();
  const habitIdData = useRecoilValue(habitIdState);
  const habitInfoData = useRecoilValue(habitInfoState);
  const { habitData } = useHabitData(habitInfoData, habitIdData);

  const habitNameValue = habitData?.habitName || "";
  const bgColorValue = habitData?.backgroundColor || "";
  const fontColorValue = habitData?.fontColor || "";
  const tagsValue = habitData?.habitTags || [];
  const transformedTagsValue = tagsValue.map((tag, index) => ({
    id: index,
    tag,
  }));
  const disclosureValue = habitData?.habitVisibility || "";

  const [habitName, setHabitName] = useState<string>(
    name === "edit" ? habitNameValue : ""
  );
  const [BgColor, setBgColor] = useState<string>(
    name === "edit" ? bgColorValue : ""
  );
  const [fontColor, setFontColor] = useState<string>(
    name === "edit" ? fontColorValue : ""
  );
  const [tags, setTags] = useState<string[]>(name === "edit" ? tagsValue : []);
  const [addErrorAlert, setAddArrorAlert] = useState<boolean>(false);
  const [disclosure, setDisclosure] = useState<string>(
    name === "edit" ? disclosureValue : "PUBLIC"
  );

  const handleHabitNameInputChange = (value: string) => {
    setHabitName(value);
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
    if (habitName !== "" && BgColor !== "" && fontColor !== "") {
      const postHabitCreate = async () => {
        try {
          const response = await AxiosAPI.habitCreate(
            BgColor,
            fontColor,
            habitName,
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

  const handleChangeClick = () => {
    if (habitName !== "" && BgColor !== "" && fontColor !== "") {
      const patchHabitChange = async () => {
        try {
          const response = await AxiosAPI.habitChange(
            habitIdData,
            BgColor,
            fontColor,
            habitName,
            disclosure,
            tags
          );
          if (response && response.status === 200) {
            console.log("습관 수정 성공");
            navigate(-1);
          }
        } catch (error) {
          console.error(error);
        }
      };
      patchHabitChange();
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
              {name === "add" && <Add onClick={handleCreateClick} />}
              {name === "edit" && <Edit onClick={handleChangeClick} />}
            </RemoteButtonContainer>
            <HabitEditContainer>
              <BackGroundColorEdit
                name={name}
                setSeletValue={handleHabitBgColortSeletorChange}
                value={bgColorValue}
              />
              <FontColorEdit
                name={name}
                setSeletValue={handleHabitFontSeletorChange}
                value={fontColorValue}
              />
              <TextEditBox
                title="습관 이름"
                name={name}
                placeholder="습관 이름을 입력해주세요."
                setInputValue={handleHabitNameInputChange}
                value={habitNameValue}
              />
              <TagEditBox
                title="태그 목록"
                name={name}
                value={transformedTagsValue}
                placeholder="태그를 입력하고 엔터를 눌러주세요."
                setTagValue={handleHabitTagChange}
              />
              <DisclosureSelect
                name={name}
                value={disclosureValue}
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
