import React, { useCallback, useEffect } from "react";
import styled from "styled-components";
import { ReactComponent as Check } from "../../resources/Icons/check.svg";
import { ReactComponent as Chat } from "../../resources/Icons/chat.svg";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import useViewport from "../../util/viewportHook";
import { useRecoilState } from "recoil";
import { toastDataState } from "../../util/habitState";

const ToastList = () => {
  const { isMobile } = useViewport();
  const today = new Date();
  const formattedDate = `${today.getFullYear()}/ ${
    today.getMonth() + 1
  }/ ${today.getDate()}  ${today.getHours()}:${today.getMinutes()}`;
  const [toastData, setToastData] = useRecoilState(toastDataState);

  // useEffect(() => {
  //   toastData.map((data, index) => {
  //     if (data.messageType === "create") {
  //       habitCreate(index);
  //     } else if (data.messageType === "delete") {
  //       habitDelete(index);
  //     } else if (data.messageType === "patch") {
  //       habitPatch(index);
  //     } else if (data.messageType === "chat") {
  //       chatMessage(index);
  //     }
  //     const newToastData = [...toastData];
  //     newToastData.splice(index, 1);
  //     setToastData(newToastData);
  //     return null;
  //   });
  // }, []);

  const habitCreate = useCallback(
    (index: number) => {
      toast(
        <div className="messeageBox">
          <Check />
          <div>
            "{toastData[index].nameData}" 습관이 생성되었습니다!
            <br />
            {formattedDate}
          </div>
        </div>
      );
    },
    [toastData, formattedDate]
  );

  const habitPatch = useCallback(
    (index: number) => {
      toast(
        <div className="messeageBox">
          <Check />
          <div>
            "{toastData[index].nameData}" 습관이 수정되었습니다!
            <br />
            {formattedDate}
          </div>
        </div>
      );
    },
    [toastData, formattedDate]
  );

  const habitDelete = useCallback(
    (index: number) => {
      toast(
        <div className="messeageBox">
          <Check />
          <div>
            "{toastData[index].nameData}" 습관이 삭제되었습니다!
            <br />
            {formattedDate}
          </div>
        </div>
      );
    },
    [toastData, formattedDate]
  );

  const chatMessage = useCallback(
    (index: number) => {
      toast(
        <div className="messeageBox">
          <Chat />
          <div>
            {toastData[index].nameData}님께 메세지가 도착했습니다.
            <br />
            {toastData[index].messageData}
          </div>
        </div>
      );
    },
    [toastData]
  );

  useEffect(() => {
    const processToastData = async () => {
      for (let index = 0; index < toastData.length; index++) {
        const data = toastData[index];
        if (data.messageType === "create") {
          habitCreate(index);
        } else if (data.messageType === "delete") {
          habitDelete(index);
        } else if (data.messageType === "patch") {
          habitPatch(index);
        } else if (data.messageType === "chat") {
          chatMessage(index);
        }

        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      setToastData([]);
    };

    if (toastData.length > 0) {
      processToastData();
    }
  }, [
    toastData,
    habitCreate,
    habitDelete,
    habitPatch,
    chatMessage,
    setToastData,
  ]);

  return (
    <ToastBox $isMobile={isMobile}>
      <ToastContainer
        position="top-center" // 알람 위치 지정
        autoClose={3000} // 자동 off 시간
        hideProgressBar={false} // 진행시간바 숨김
        closeOnClick // 클릭으로 알람 닫기
        rtl={false} // 알림 좌우 반전
        pauseOnFocusLoss // 화면을 벗어나면 알람 정지
        draggable // 드래그 가능
        pauseOnHover // 마우스를 올리면 알람 정지
        theme="light"
        // limit={1} // 알람 개수 제한
      />
    </ToastBox>
  );
};

const ToastBox = styled.div<{ $isMobile: boolean }>`
  --toastify-toast-width: ${(props) => (props.$isMobile ? "100%" : "768px")};
  --toastify-color-progress-light: #363636;
  --toastify-text-color-light: #363636;

  .messeageBox {
    display: flex;
    align-items: center;
    font-size: 14px;
    font-weight: bolder;
    > svg {
      margin-right: 20px;
    }
  }
`;
export default ToastList;
