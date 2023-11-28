import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { ReactComponent as Back } from "../../resources/Icons/backChat.svg";
import { ReactComponent as Send } from "../../resources/Icons/topArrow.svg";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  alarmMessageState,
  memberIdState,
  roomIdState,
  userIdState,
} from "../../util/habitState";
import * as StompJs from "@stomp/stompjs";
import { ChatRoomProps, MessageData } from "../../util/types";
import useChatList from "../../util/chatListHook";
import useViewport from "../../util/viewportHook";
import BubbleBox from "../SignUp/BubbleBox";

const ChatRoomBox = ({ onClose, Name }: ChatRoomProps) => {
  const accessToken = JSON.stringify(
    window.localStorage.getItem("accessToken")
  ); // 현재 로
  let [client, changeClient] = useState<StompJs.Client | null>(null);
  const [selectId, setselectId] = useRecoilState(memberIdState);
  const roomId = useRecoilValue(roomIdState);
  const { chatListData, userName, userImg } = useChatList(roomId);
  const [chatList, setChatList] = useState<MessageData[]>([]);
  const userId = useRecoilValue(userIdState);
  const [InputMessage, setInputMessage] = useState<string>("");
  const setalarmMessageDataState = useSetRecoilState(alarmMessageState);
  const { isMobile } = useViewport();

  const bottom = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    setTimeout(() => {
      bottom.current?.scrollIntoView({ behavior: "auto" });
    }, 100);
  };
  const onChangeInputMessage = (e: ChangeEvent<HTMLInputElement>): void => {
    setInputMessage(e.target.value);
  };

  const handleClickBack = () => {
    onClose();
    setselectId(0);
  };

  const preMsgBox = chatListData.map((item, index) => {
    console.log(item.senderId);
    if (Number(item.senderId) !== selectId) {
      return (
        <BubbleBox name="right" key={index} type="none" ani={true}>
          {item.content}
        </BubbleBox>
      );
    } else {
      console.log(item.content);
      return (
        <BubbleBox
          name="left"
          key={index}
          type="none"
          userName={userName}
          userImg={userImg}
        >
          {item.content}
        </BubbleBox>
      );
    }
  });

  const MsgBox = chatList.map((item, index) => {
    if (Number(item.senderId) !== selectId) {
      return (
        <BubbleBox name="right" key={index} ani={true}>
          {item.content}
        </BubbleBox>
      );
    } else {
      return (
        <BubbleBox
          name="left"
          key={index}
          userName={userName}
          userImg={userImg}
        >
          {item.content}
        </BubbleBox>
      );
    }
  });

  const connect = () => {
    // 소켓 연결
    const cleanAccessToken = accessToken.replace(/"/g, "");
    try {
      const clientdata = new StompJs.Client({
        brokerURL: "wss://localhost:8080/ws",
        connectHeaders: {
          Authorization: `Bearer ${cleanAccessToken}`,
        },
        debug: function (str) {
          console.log(str);
        },
        reconnectDelay: 5000, // 자동 재 연결
        heartbeatIncoming: 4000,
        heartbeatOutgoing: 4000,
      });

      // 구독
      clientdata.onConnect = function () {
        const channel = `/sub/channel/${userId}`;
        clientdata.subscribe(channel, (message) => {
          setChatList((prevChatList) => [
            ...prevChatList,
            JSON.parse(message.body),
          ]);
          scrollToBottom();
          try {
            const content = JSON.parse(message.body).content;
            const senderId = JSON.parse(message.body).senderId;
            console.log(content);
            setalarmMessageDataState((prevAlarmMessageDataState) =>
              prevAlarmMessageDataState.concat({
                Name: String(senderId),
                data: String(content),
              })
            );
          } catch (error) {
            console.error("Error parsing message body:", error);
          }
        });
      };

      clientdata.activate(); // 클라이언트 활성화
      changeClient(clientdata); // 클라이언트 갱신
    } catch (err) {
      console.log(err);
    }
  };

  const sendChat = () => {
    if (InputMessage === "") {
      return; // 빈 문자열이면 아무 작업도 하지 않고 종료
    }

    // 메시지 보내기
    client?.publish({
      destination: "/pub/chat",
      body: JSON.stringify({
        type: "",
        senderId: userId,
        receiverId: selectId,
        content: InputMessage,
      }),
    });

    // 채팅 목록 업데이트
    setChatList((prevChatList) => [
      ...prevChatList,
      {
        type: "",
        senderId: String(userId),
        receiverId: String(selectId),
        content: InputMessage,
      },
    ]);
    scrollToBottom();

    // 입력 메시지 초기화
    setInputMessage("");
  };

  useEffect(() => {
    scrollToBottom();
    connect();
  }, []);

  return (
    <>
      <ChatHeader $isMobile={isMobile}>
        <Back onClick={handleClickBack} /> {Name}
      </ChatHeader>
      <ChatBox>
        {preMsgBox}
        {MsgBox}
      </ChatBox>

      <div ref={bottom} />
      <ChattingBox $isMobile={isMobile}>
        <input
          type="text"
          className="MessageBox"
          onChange={onChangeInputMessage}
          value={InputMessage}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              sendChat();
            }
          }}
        ></input>
        <div className="sendButton">
          <Send onClick={sendChat} />
        </div>
      </ChattingBox>
    </>
  );
};

export default ChatRoomBox;

const ChattingBox = styled.div<{ $isMobile: boolean }>`
  width: ${(props) => (props.$isMobile ? "100%" : "768px")};
  padding: 10px;
  height: 80px;
  position: fixed;
  bottom: 0;
  background-color: #e8e8e8;
  align-items: center;
  display: flex;
  justify-content: space-between;

  .MessageBox {
    width: 80%;
    height: 50px;
    background-color: white;
    border-radius: 10px;
    margin-left: 20px;
    padding-left: 20px;
    font-size: 16px;
    border: 0;
    display: flex;
    align-items: center;
    outline: none;
  }

  .sendButton {
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    cursor: pointer;
  }
`;

const ChatHeader = styled.div<{ $isMobile: boolean }>`
  position: fixed;
  top: 0;
  font-size: 18px;
  font-weight: bolder;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  padding: 20px;
  z-index: 1;
  background-color: white;
  border-bottom: 1px solid #c7c7c7;
  width: ${(props) => (props.$isMobile ? "100%" : "768px")};

  > svg {
    position: absolute;
    left: 30px;
  }
`;
const ChatBox = styled.div`
  width: 100%;
  padding-top: 100px;
  padding-bottom: 100px;
`;
