import React from "react";
import styled from "styled-components";
import { ChatRoomListProps } from "../../util/types";
import { ReactComponent as Delete } from "../../resources/Icons/delete.svg";
import { useSetRecoilState } from "recoil";
import { memberIdState, roomIdState } from "../../util/habitState";
import AxiosAPI from "../../api/AxiosAPI";

const ChatRoomList = ({
  userName,
  userImg,
  lastChat,
  roomId,
  senderId,
}: ChatRoomListProps) => {
  const setSelectId = useSetRecoilState(memberIdState);
  const setRoomId = useSetRecoilState(roomIdState);

  const handleChatRoomClick = () => {
    setSelectId(senderId);
    setRoomId(roomId);
  };

  const handleDeleteClick = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    const deleteChatRoom = async () => {
      try {
        const response = await AxiosAPI.chatDelete(roomId);
        if (response.status === 200) {
          console.log("채팅방 삭제 완료");
          window.location.reload();
        }
      } catch (e) {
        console.log(e);
      }
    };
    deleteChatRoom();
  };

  return (
    <>
      <ChatRoomContainer $profileUrl={userImg} onClick={handleChatRoomClick}>
        <div className="content">
          <div className="profileImg" />
          <div>
            <div className="userName">{userName}</div>
            <div className="lastChat">{lastChat}</div>
          </div>
        </div>
        <div>
          <Delete onClick={handleDeleteClick} />
        </div>
      </ChatRoomContainer>
    </>
  );
};

const ChatRoomContainer = styled.div<{ $profileUrl: string }>`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  padding: 30px;

  .userName {
    font-weight: bolder;
  }
  .lastChat {
    color: gray;
  }
  .profileImg {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-image: url(${(props) => props.$profileUrl});

    background-size: cover;
    background-position: center;
    margin-right: 10px;
  }

  .content {
    display: flex;
    align-items: center;
  }
`;
export default ChatRoomList;
