import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import { ReactComponent as Setting } from "../../resources/Icons/settings.svg";
import { ReactComponent as Back } from "../../resources/Icons/profileBack.svg";
import { ReactComponent as PhotoAdd } from "../../resources/Icons/photoAdd.svg";
import { ReactComponent as Bell } from "../../resources/Icons/bell.svg";
import PersonList from "./PersonList";
import { useNavigate } from "react-router-dom";
import AxiosAPI from "../../api/AxiosAPI";
import { InfoData, ProfileProps } from "../../util/types";
import { memberIdState } from "../../util/habitState";
import { useRecoilValue } from "recoil";
import EditButton from "../MyPage/EditButton";
import WhiteEditButton from "../MyPage/WhiteEditButton";
import Alert from "../common/Alert";
import SelfFollowErrorAlert from "../Search/SelfFollowErrorAlert";
import AlarmModal from "../common/AlarmModal";
import AlarmBox from "./AlarmBox";

const Profile = ({ name, userName, Introduction }: ProfileProps) => {
  const { isMobile } = useViewport();
  const navigate = useNavigate();

  const [InfoData, setInfoData] = useState<InfoData | null>(null);
  const [memberInfoData, setMemberInfoData] = useState<InfoData | null>(null);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [backGroundFile, setBackGroundFile] = useState<File | null>(null);
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [backGroundeUrl, setBackGroundUrl] = useState<string>("");
  const [isFriend, setIsFriend] = useState<boolean>(true);
  const [FollowErrorAlert, setFollowErrorAlert] = useState<boolean>(false);
  const [alarmModal, setAlarmModal] = useState<boolean>(false);
  const selectId = useRecoilValue(memberIdState);
  const handleProfileFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setProfileFile(e.target.files[0]);
      const image = window.URL.createObjectURL(e.target.files[0]);
      setProfileUrl(image);
    }
  };

  const handleBackGroundFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files[0]) {
      setBackGroundFile(e.target.files[0]);
      const image = window.URL.createObjectURL(e.target.files[0]);
      setBackGroundUrl(image);
    }
  };

  const openFollowErrorAlert = () => {
    setFollowErrorAlert(true);
  };

  const closeFollowErrorAlert = () => {
    setFollowErrorAlert(false);
  };

  const openAlarmModal = () => {
    setAlarmModal(true);
  };

  const closeAlarmModal = () => {
    setAlarmModal(false);
  };

  const handleChangeClick = () => {
    if (name === "edit") {
      const patchUserInfoChange = async () => {
        try {
          const userNameValue = userName || "";
          const introductionValue = Introduction || "";
          const profileFileValue = profileFile;
          const backGroundFileValue = backGroundFile;

          const response = await AxiosAPI.userInfoChange(
            userNameValue,
            introductionValue,
            profileFileValue,
            backGroundFileValue
          );
          if (response && response.status === 200) {
            console.log("회원정보 수정 성공");
            navigate(-1);
          }
        } catch (error) {
          console.log(error);
        }
      };
      patchUserInfoChange();
    } else navigate(-1);
  };

  const handleFollowClick = () => {
    const postFollow = async () => {
      try {
        const response = await AxiosAPI.follow(selectId);
        if (response.status === 200) {
          console.log("팔로우 성공");
          setIsFriend(true);
        }
      } catch (error) {
        console.log(error);
        openFollowErrorAlert();
      }
    };
    postFollow();
  };

  const handleUnFollowClick = () => {
    const deleteUnFollow = async () => {
      try {
        const response = await AxiosAPI.unFollow(selectId);
        if (response.status === 200) {
          console.log("언팔로우 성공");
          setIsFriend(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    deleteUnFollow();
  };
  useEffect(() => {
    const getMyInfo = async () => {
      try {
        const response = await AxiosAPI.userInfo();
        if (response.status === 200) setInfoData(response.data.data);
      } catch (e) {
        console.log(e);
      }
    };
    getMyInfo();
    if (name === "friend" || name === "search") {
      if (selectId !== 0) {
        const getFriendUserInfo = async () => {
          try {
            const response = await AxiosAPI.friendUserInfo(selectId);
            if (response.status === 200) setMemberInfoData(response.data.data);
            console.log(response.data.data.friendHabitList);
            const isFriendValue =
              response.data.data.isFriend === 1 ? true : false;
            setIsFriend(isFriendValue);
          } catch (e) {
            console.log(e);
          }
        };
        getFriendUserInfo();
      }
    }
  }, [name, selectId, setMemberInfoData]);

  let backgroundUrl = "";
  if (name === "edit" || name === "main" || name === "mypage") {
    backgroundUrl = backGroundeUrl || InfoData?.backgroundImage || "";
  } else if (name === "friend" || name === "search") {
    backgroundUrl = memberInfoData?.backgroundImage || "";
  }

  return (
    <>
      <ProfileContainer $isMobile={isMobile}>
        <BackgroundBox $backgroundUrl={backgroundUrl}>
          {name === "search" && (
            <div className="backButton">
              <Back onClick={() => navigate(-1)} />
            </div>
          )}
          {name === "edit" && (
            <div className="backButton">
              <div className="back">
                <Back onClick={handleChangeClick} />
              </div>
            </div>
          )}
          {name === "main" && (
            <>
              <div className="backgroundButton">
                <div className="bell">
                  <Bell
                    onClick={() => {
                      openAlarmModal();
                    }}
                  />
                </div>
              </div>
            </>
          )}
          {name === "edit" && (
            <>
              <div className="backgroundButton">
                <form encType="multipart/form-data">
                  <label htmlFor="backgorundFile">
                    <PhotoAdd />
                  </label>
                  <input
                    type="file"
                    className="file"
                    id="backgorundFile"
                    accept="image/*"
                    onChange={handleBackGroundFileChange}
                  />
                </form>
              </div>
            </>
          )}
        </BackgroundBox>
        <ProfileBox>
          {(name === "edit" || name === "main" || name === "mypage") && (
            <ProfileImg
              $profileUrl={profileUrl || InfoData?.profileImage || ""}
            />
          )}
          {(name === "friend" || name === "search") && (
            <ProfileImg $profileUrl={memberInfoData?.profileImage || ""} />
          )}

          {name === "edit" && (
            <>
              <div className="profileButton">
                <form encType="multipart/form-data">
                  <label htmlFor="profleFile">
                    <PhotoAdd />
                  </label>
                  <input
                    type="file"
                    className="file"
                    id="profleFile"
                    accept="image/*"
                    onChange={handleProfileFileChange}
                  />
                </form>
              </div>
            </>
          )}
          <div className="title">
            {(name === "main" || name === "mypage") && InfoData && (
              <>
                <div>
                  <div className="name">{InfoData.username}</div>
                  <div className="aboutMe">{InfoData.introduction}</div>
                </div>
              </>
            )}
            {(name === "friend" || name === "search") && memberInfoData && (
              <>
                <div>
                  <div className="name">{memberInfoData.username}</div>
                  <div className="aboutMe">{memberInfoData.introduction}</div>
                </div>
              </>
            )}
            {name === "edit" && InfoData && (
              <>
                <div>
                  <div className="name">{userName}</div>
                  <div className="aboutMe">{Introduction}</div>
                </div>
              </>
            )}

            {(name === "main" || name === "mypage") && (
              <div className="setting" onClick={() => navigate("/edit")}>
                <Setting />
              </div>
            )}
            {(name === "friend" || name === "search") &&
              !isFriend &&
              selectId !== 0 && (
                <div className="setting">
                  <EditButton name="팔로우" onClick={handleFollowClick} />
                </div>
              )}
            {(name === "friend" || name === "search") &&
              isFriend &&
              selectId !== 0 && (
                <div className="setting">
                  <WhiteEditButton
                    name="팔로잉"
                    onClick={handleUnFollowClick}
                  />
                </div>
              )}
          </div>
          {(name === "main" || name === "friend") && (
            <PersonList
              userName={InfoData?.username}
              profileImage={profileUrl || InfoData?.profileImage || ""}
            />
          )}
        </ProfileBox>
      </ProfileContainer>
      {FollowErrorAlert && (
        <Alert
          open={FollowErrorAlert}
          close={closeFollowErrorAlert}
          name="로그아웃"
        >
          <SelfFollowErrorAlert onClose={closeFollowErrorAlert} />
        </Alert>
      )}
      {alarmModal && (
        <AlarmModal
          open={alarmModal}
          close={closeAlarmModal}
          height="0"
          name="알람모달"
        >
          <AlarmBox />
        </AlarmModal>
      )}
    </>
  );
};

const ProfileContainer = styled.div<{ $isMobile: boolean }>`
  position: relative;
  width: ${(props) => (props.$isMobile ? "100%" : "768px")};
  height: 300px;

  .file {
    display: none;
  }
`;

const BackgroundBox = styled.div<{ $backgroundUrl: string }>`
  width: 100%;
  height: 170px;
  background-image: url(${(props) => props.$backgroundUrl});
  background-size: cover;
  background-position: center;

  .bell {
    padding: 10px;
    padding-right: 0px;
  }

  .backButton {
    padding: 30px;
  }

  .backgroundButton {
    width: 100%;
    display: flex;
    margin: 0;
    justify-content: right;
    align-items: right;
    padding-right: 20px;
  }
`;

const ProfileBox = styled.div`
  width: 100%;
  background-color: white;

  .name {
    font-weight: bold;
    font-size: 20px;
    margin-left: 60px;
  }
  .aboutMe {
    font-size: 16px;
    margin-left: 60px;
    margin-top: 7px;
  }
  .setting {
    margin-right: 60px;
  }
  .title {
    align-items: center;
    margin-top: 85px;
    display: flex;
    justify-content: space-between;
  }
  .profileButton {
    position: absolute;
    top: 50%;
    margin-top: -30px;
    margin-left: 110px;
    z-index: 99;
  }
`;

const ProfileImg = styled.div<{ $profileUrl: string }>`
  width: 120px;
  height: 120px;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -30px;
  margin-left: 30px;
  background-image: url(${(props) => props.$profileUrl});
  background-size: cover;
  background-position: center;
`;
export default Profile;
