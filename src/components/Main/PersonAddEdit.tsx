import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import styled from "styled-components";
import useViewport from "../../util/viewportHook";
import Alert from "../common/Alert";
import AxiosAPI from "../../api/AxiosAPI";
import SearchErrorAlert from "./SearchErrorAlert";
import { SearchInfo } from "../../util/types";
import EditButton from "../MyPage/EditButton";
import WhiteEditButton from "../MyPage/WhiteEditButton";

const PersonAddEdit = () => {
  const { isMobile } = useViewport();
  const [search, setSearch] = useState<string>("");
  const [isFriend, setIsFriend] = useState<boolean>(true);
  const [searchData, setSearchData] = useState<SearchInfo>({
    backgroundImage: "",
    friendHabitList: [],
    friendId: 0,
    introduction: "",
    isFriend: 0,
    profileImage: "",
    username: "",
  });

  const [tagInputErrorAlert, setTagInputErrorAlert] = useState(false);
  const openTagInputErrorAlert = () => {
    setTagInputErrorAlert(true);
  };

  const closeTagInputErrorAlert = () => {
    setTagInputErrorAlert(false);
  };
  const handleFollowClick = () => {
    const postFollow = async () => {
      try {
        const response = await AxiosAPI.follow(searchData?.friendId);
        if (response.status === 200) {
          console.log("팔로우 성공");
          setIsFriend(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    postFollow();
  };

  const handleUnFollowClick = () => {
    const deleteUnFollow = async () => {
      try {
        const response = await AxiosAPI.unFollow(searchData?.friendId);
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
  const onClickSearch = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter" && search !== "") {
      const getSearchFriend = async () => {
        try {
          const response = await AxiosAPI.friendSearch(search);
          if (response.status === 200) {
            console.log("친구 검색 성공");
            console.log(response.data);
            setSearchData(response.data.data);
            const isFriend = response.data.data.isFriend === 0 ? false : true;
            setIsFriend(isFriend);
          }
        } catch (error) {
          console.log(error);
        }
      };
      getSearchFriend();
    } else if (e.key === "Enter" && search === "") {
      openTagInputErrorAlert();
    }
  };

  const onChangeTag = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearch(e.target.value);
  };

  return (
    <>
      <EditContainer $isMobile={isMobile}>
        <div className="inputBox">
          <input
            type="text"
            className="input"
            placeholder="아이디 및 닉네임 입력"
            onKeyPress={onClickSearch}
            onChange={onChangeTag}
            value={search}
          />
        </div>
        <div className="info">
          <div className="profile">
            <ProfileImg $profileUrl={searchData?.profileImage} />
            <div>
              <div className="username">{searchData?.username}</div>
              <div>{searchData?.introduction}</div>
            </div>
          </div>
          {searchData?.friendId !== 0 && !isFriend && (
            <div className="follow">
              <EditButton name="팔로우" onClick={handleFollowClick} />
            </div>
          )}
          {searchData?.friendId !== 0 && isFriend && (
            <WhiteEditButton name="팔로잉" onClick={handleUnFollowClick} />
          )}
        </div>
      </EditContainer>

      {tagInputErrorAlert && (
        <Alert
          open={tagInputErrorAlert}
          close={closeTagInputErrorAlert}
          name="검색 빈칸 입력 에러"
        >
          <SearchErrorAlert onClose={closeTagInputErrorAlert} />
        </Alert>
      )}
    </>
  );
};

const EditContainer = styled.div<{ $isMobile: boolean }>`
  font-size: 16px;
  width: ${(props) => (props.$isMobile ? "75%" : "80%")};
  padding-bottom: 30px;
  margin: 0 auto;
  margin-top: 20px;

  .inputBox {
    display: flex;
  }
  .tag {
    background-color: #363636;
    border-radius: 20px;
    display: flex;
    align-items: center;
    padding: 8px;
    color: white;
    white-space: nowrap;
    font-size: 14px;
    margin: 0;
    margin-left: 10px;
  }
  .close {
    margin-left: 5px;
    margin-right: 5px;
  }
  .taglist {
    display: flex;
  }
  .name {
    margin-left: 3px;
  }
  .input {
    width: 100%;
    background-color: #e8e8e8;
    font-size: 16px;
    border: none;
    outline: none;
    border-radius: 5px;
    border: 0;
    height: 35px;
    padding-left: 10px;
    margin-top: 10px;
  }
  .info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 20px;
  }
  .profile {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .username {
    font-weight: bolder;
  }
  .follow {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
const ProfileImg = styled.div<{ $profileUrl: string }>`
  width: 50px;
  height: 50px;
  margin: 0;
  margin-right: 10px;
  margin-left: 0;
  border-radius: 50%;
  background-image: url(${(props) => props.$profileUrl});
  background-size: cover;
  background-position: center;
`;

export default PersonAddEdit;
