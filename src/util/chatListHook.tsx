import { useEffect, useState } from "react";
import { MessageData } from "./types";
import AxiosAPI from "../api/AxiosAPI";
import { useRecoilValue } from "recoil";
import { memberIdState, userIdState } from "./habitState";

function useChatList(roomId: number) {
  const [chatListData, setChatListData] = useState<MessageData[]>([]);
  const [userName, setUserName] = useState<string>("");
  const [userImg, setUserImg] = useState<string>("");
  const userId = useRecoilValue(userIdState);
  const selectId = useRecoilValue(memberIdState);
  useEffect(() => {
    const getChatList = async () => {
      try {
        const response = await AxiosAPI.chatList(roomId);
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
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    getChatList();
  }, [roomId, userId, selectId]);

  return { chatListData, userName, userImg };
}

export default useChatList;
