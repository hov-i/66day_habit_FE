import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as More } from "../../resources/Icons/more.svg";
import Modal from "../common/Modal";
import HabitMore from "./HabitMore";
import { useRecoilValue, useSetRecoilState } from "recoil";
import AtWork from "../../resources/at_work.png";
import IdentityYourTriggers from "../../resources/identity_your_triggers.png";
import PracticeMindfullness from "../../resources/practice_mindfullness.png";
import Productivity from "../../resources/productivity.png";
import SelfCare from "../../resources/self_care.png";
import UseReminders from "../../resources/use_remainders.png";
import Happiness from "../../resources/happiness.png";

import {
  doneHabitInfoState,
  habitIdState,
  memberHabitInfoState,
  memberIdState,
  newHabitInfoState,
  userHabitInfoState,
} from "../../util/habitState";
import useHabitData from "../../util/habitInfoHook";
import useHabitColor from "../../util/habitcolorHook";
import { HabitBoxProps, HabitInfo } from "../../util/types";
import { useNavigate } from "react-router-dom";
import commendData from "../../style/commendData";
import AxiosAPI from "../../api/AxiosAPI";

const HabitBox = React.forwardRef<HTMLDivElement, HabitBoxProps>(
  ({ name, habitId, title, habitName }, ref) => {
    const [userProfileUrl, setUserProfileUrl] = useState<string>("");
    const [userName, setUserName] = useState<string>("");
    const [moreModalOpen, setMoreModalOpen] = useState<boolean>(false);
    const userHabitInfoData = useRecoilValue(userHabitInfoState);
    const memberHabitInfoData = useRecoilValue(memberHabitInfoState);
    const newHabitInfoData = useRecoilValue(newHabitInfoState);
    const doneHabitInfoData = useRecoilValue(doneHabitInfoState);
    const setSelectId = useSetRecoilState(memberIdState);

    let HabitInfoValue: HabitInfo[] = [];
    let CommendColorCode: string | undefined = "";
    let CommendImgUrl: string | undefined = "";
    if (name === "main") {
      HabitInfoValue = userHabitInfoData;
    } else if (name === "friend") {
      HabitInfoValue = memberHabitInfoData;
    } else if (name === "new") {
      HabitInfoValue = newHabitInfoData;
    } else if (name === "done") {
      HabitInfoValue = doneHabitInfoData;
    } else if (name === "commend") {
      CommendColorCode = commendData.find((item) => item.name === title)?.color;
      switch (title) {
        case "Identify your triggers":
          CommendImgUrl = IdentityYourTriggers;
          break;
        case "Practice mindfulness":
          CommendImgUrl = PracticeMindfullness;
          break;
        case "Use reminders":
          CommendImgUrl = UseReminders;
          break;
        case "Self-care":
          CommendImgUrl = SelfCare;
          break;
        case "Productivity":
          CommendImgUrl = Productivity;
          break;
        case "Happiness":
          CommendImgUrl = Happiness;
          break;
        case "At work":
          CommendImgUrl = AtWork;
          break;
      }
    }
    const { habitData } = useHabitData(HabitInfoValue, habitId);
    const { bgColorCode } = useHabitColor(habitData);
    const { isMobile } = useViewport();
    const setHabitIdData = useSetRecoilState(habitIdState);
    const navigate = useNavigate();

    const openMoreModal = () => {
      setMoreModalOpen(true);
    };

    const closeMoreModal = () => {
      setMoreModalOpen(false);
    };

    const handleBoxClick = () => {
      if (name !== "commend") {
        if (name === "main") {
          setSelectId(0);
        } else {
          setSelectId(habitData?.memberId ? habitData.memberId : 0);
        }

        setHabitIdData(habitId ? habitId : 0);
        navigate("/habit/detail");
      }
    };

    const handleProfileClick = (e: any) => {
      if (name === "new" || name === "done") {
        setSelectId(habitData?.memberId ? habitData.memberId : 0);
        navigate("/user/profile");
      }
    };

    useEffect(() => {
      if ((name === "new" || name === "done") && habitData) {
        const getFriendUserInfo = async () => {
          try {
            const response = await AxiosAPI.friendUserInfo(
              habitData?.memberId ? habitData.memberId : 0
            );
            if (response.status === 200) {
              setUserProfileUrl(response.data.data.profileImage);
              setUserName(response.data.data.username);
            }
          } catch (e) {
            console.log(e);
          }
        };
        getFriendUserInfo();
      }
    });

    return (
      <>
        <TagList $name={name}>
          {habitData ? (
            habitData.habitTags?.length > 0 ? (
              habitData.habitTags.map((tag, index) => (
                <span key={index} className="tag">
                  #{tag}
                </span>
              ))
            ) : (
              <span>&nbsp;</span>
            )
          ) : (
            <span>&nbsp;</span>
          )}
        </TagList>
        <HabitBoxStyle
          ref={ref}
          onClick={handleBoxClick}
          $isMobile={isMobile}
          $profileUrl={
            CommendImgUrl !== ""
              ? CommendImgUrl
              : userProfileUrl !== ""
              ? userProfileUrl
              : ""
          }
          $bgColor={
            bgColorCode ? bgColorCode : CommendColorCode ? CommendColorCode : ""
          }
          $fontColor={habitData ? habitData.fontColor : "BLACK"}
          $bgPercent={habitData ? habitData.progress : 100}
        >
          {name === "main" && (
            <div className="editButton">
              <More
                onClick={(e) => {
                  e.stopPropagation();
                  openMoreModal();
                }}
              />
            </div>
          )}
          {(name === "commend" ||
            name === "search" ||
            name === "new" ||
            name === "done") && (
            <>
              <div
                className="profileBox"
                onClick={(e) => {
                  e.stopPropagation();
                  handleProfileClick(e);
                }}
              />
              <p className="userName">
                {name === "commend" && (title !== "" ? title : "")}{" "}
                {(name === "new" || name === "done") &&
                  (userName !== "" ? userName : "")}
              </p>
            </>
          )}

          <div className="habitName">
            {habitData ? habitData.habitName : habitName ? habitName : ""}
          </div>
        </HabitBoxStyle>
        {moreModalOpen && (
          <Modal
            open={moreModalOpen}
            close={closeMoreModal}
            height="400px"
            name="이메일 수정"
          >
            <HabitMore habitId={habitId} />
          </Modal>
        )}
      </>
    );
  }
);

const HabitBoxStyle = styled.div<{
  $isMobile: boolean;
  $bgColor: string;
  $fontColor: string;
  $bgPercent: number;
  $profileUrl: string;
}>`
  cursor: pointer;
  position: relative;
  color: ${(props) => (props.$fontColor === "BLACK" ? "#363636" : "white")};
  width: 100%;
  height: ${(props) => (props.$isMobile ? "95px" : "105px")};
  border-radius: 23px;
  background-color: #e8e8e8;
  background-image: ${(props) => (props.$bgColor ? props.$bgColor : "none")};
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  background-size: ${(props) =>
    props.$bgPercent ? `${props.$bgPercent}%` : "0%"};
  background-position: left;
  background-repeat: no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;

  .profileBox {
    position: absolute;
    border-radius: 50%;
    background-image: url(${(props) => props.$profileUrl});
    background-size: cover;
    background-position: center;
    width: 65px;
    height: 65px;
    bottom: ${(props) => (props.$isMobile ? "70px" : "85px")};
    left: ${(props) => (props.$isMobile ? "10px" : "20px")};
  }
  .userName {
    position: absolute;
    bottom: ${(props) => (props.$isMobile ? "80px" : "90px")};
    left: ${(props) => (props.$isMobile ? "80px" : "95px")};
    font-size: 18px;
    font-weight: bold;
    color: #363636;
  }
  .habitName {
    text-align: center;
    font-size: ${(props) => (props.$isMobile ? "15px" : "20px")};
    font-weight: bold;
  }

  .editButton {
    position: absolute;
    top: 8px;
    right: 8px;
  }
`;

const TagList = styled.p<{ $name: string }>`
  width: 95%;
  text-align: right;
  margin: 0;
  margin: ${(props) =>
    props.$name === "commend" || props.$name === "search" ? "60px" : "30px"};
  font-size: 16px;
  margin-bottom: 10px;

  .tag {
    margin-right: 10px;
  }
`;

export default HabitBox;
