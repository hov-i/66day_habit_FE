import React, { useEffect, useState } from "react";
import Box from "../components/common/Box";
import styled from "styled-components";
import Navbar from "../components/common/NavBar";
import PersonList from "../components/Main/PersonList";
import BubbleBox from "../components/SignUp/BubbleBox";
import useViewport from "../util/viewportHook";
import { useRecoilState } from "recoil";
import { memberIdState } from "../util/habitState";
import { ChatRoomData } from "../util/types";
import AxiosAPI from "../api/AxiosAPI";
import ChatRoomList from "../components/Chat/ChatRoomList";
import Modal from "../components/common/Modal";
import ChatRoomBox from "../components/Chat/ChatRoomBox";

const ChattingPage = () => {
  const [selectId, setSelectId] = useRecoilState(memberIdState);
  const [chatRoomData, setChatRoomData] = useState<ChatRoomData[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
  const [chatRoomOpen, setChatRoomOpen] = useState<boolean>(false);
  const [chatClick, setChatClick] = useState<boolean>(false);
  const { isMobile } = useViewport();

  const closeChatRoomModal = () => {
    setChatRoomOpen(false);
  };
  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const response = await AxiosAPI.chatRoom();
        if (response.status === 200)
          setChatRoomData(response.data.data.chatRoomList);
        setIsDataLoaded(true);
      } catch (e) {
        console.log(e);
      }
    };
    getChatRoom();

    if (selectId !== 0) {
      if (chatClick) {
        setChatRoomOpen(true);
      }

      const getFriendName = async () => {
        try {
          const response = await AxiosAPI.friendUserInfo(selectId);
          if (response.status === 200) setUserName(response.data.data.username);
        } catch (e) {
          console.log(e);
        }
      };
      getFriendName();
    }
  }, [selectId, setSelectId, chatClick]);

  return (
    <Box>
      <ChattingRoom $isMobile={isMobile} onClick={() => setChatClick(true)}>
        <PersonList />
      </ChattingRoom>

      {isDataLoaded ? (
        <ChattingConatiner $isMobile={isMobile}>
          <div className="container">
            <>
              {chatRoomData.length === 0 ? (
                <>
                  <BubbleBox name="left">상단의 친구 프로필을 눌러</BubbleBox>
                  <BubbleBox name="right">대화를 시작해보세요!</BubbleBox>
                </>
              ) : (
                chatRoomData.map((data) => (
                  <div onClick={() => setChatClick(true)}>
                    <ChatRoomList
                      key={data.chatRoomId}
                      userImg={data.senderProfileImage}
                      userName={data.senderName}
                      roomId={data.chatRoomId}
                      senderId={data.senderId}
                      lastChat={data.lastMessage}
                    />
                  </div>
                ))
              )}
            </>
          </div>
        </ChattingConatiner>
      ) : null}
      <Navbar />
      {chatRoomOpen && (
        <Modal
          open={chatRoomOpen}
          close={closeChatRoomModal}
          name="채팅창 열기"
          height="1000px  "
        >
          <ChatRoomBox onClose={closeChatRoomModal} Name={userName} />
        </Modal>
      )}
    </Box>
  );
};

export default ChattingPage;

const ChattingConatiner = styled.div<{ $isMobile: boolean }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  .container {
    padding-top: 150px;
    padding-bottom: ${(props) => (props.$isMobile ? "100px" : "200px")};
  }
`;

const ChattingRoom = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  top: 0;
  z-index: 1;
  background-color: white;
  width: ${(props) => (props.$isMobile ? "100%" : "768px")};
`;
