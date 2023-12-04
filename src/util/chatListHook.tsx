import { useEffect, useState } from "react";
import { MessageData } from "./types";
import AxiosAPI from "../api/AxiosAPI";
import { useRecoilValue } from "recoil";
import { userIdState } from "./habitState";

const useChatList = (selectId: number) => {
  const [chatListData, setChatListData] = useState<MessageData[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userImg, setUserImg] = useState<string>("");
  const userId = useRecoilValue(userIdState);

  useEffect(() => {
    const getChatRoom = async () => {
      try {
        const response = await AxiosAPI.chatRoom();
        if (response.status === 200) {
          const chatRoomList = response.data.data.chatRoomList;

          // selectId와 일치하는 chatRoomId 찾기
          const selectedChatRoom = chatRoomList.find(
            (room: { senderId: number }) => room.senderId === selectId
          );

          if (selectedChatRoom) {
            const selectedChatRoomId = selectedChatRoom.chatRoomId;

            const getChatList = async () => {
              try {
                const response = await AxiosAPI.chatList(selectedChatRoomId);
                if (response.status === 200) {
                  let firstObject = response.data.data.chatMessageList[0];

                  if (
                    firstObject.senderId === selectId ||
                    firstObject.receiverId === selectId
                  ) {
                    if (firstObject.senderId !== userId) {
                      setUserName(firstObject.senderName);
                      setUserImg(firstObject.senderImg);
                    } else {
                      setUserName(firstObject.receiverName);
                      setUserImg(firstObject.receiverImg);
                    }
                    setChatListData(response.data.data.chatMessageList);
                  } else {
                  }
                }
              } catch (e) {
                console.log(e);
              }
            };
            getChatList();
          } else {
            console.log("일치하는 채팅방이 없습니다.");
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    getChatRoom();
  }, [selectId, userId]);

  return { chatListData, userName, userImg };
};

export default useChatList;
