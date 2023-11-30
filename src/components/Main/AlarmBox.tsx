import styled from "styled-components";
import { ReactComponent as Alarm } from "../../resources/Icons/Alram.svg";
import { ReactComponent as Check } from "../../resources/Icons/check.svg";
import { ReactComponent as Chat } from "../../resources/Icons/chatting.svg";
import { ReactComponent as Close } from "../../resources/Icons/closeBlack.svg";
import { useRecoilState } from "recoil";
import { alarmMessageState } from "../../util/habitState";

const AlarmBox = () => {
  const [alarmMessageDataState, setAlarmMessageDataState] =
    useRecoilState(alarmMessageState);

  const handleCloseClick = (index: number) => {
    const newAlarmMessageDataState = [...alarmMessageDataState];
    newAlarmMessageDataState.splice(index, 1);
    setAlarmMessageDataState(newAlarmMessageDataState);
  };
  console.log("alarmMessageDataState 첫번째 요소:", alarmMessageDataState[0]);

  return (
    <>
      <AlarmContainer>
        <div className="title">
          <Alarm />
          알람
        </div>
        <hr />
        {alarmMessageDataState?.map((data, index) => (
          <div className="message" key={index}>
            {data.data === "create" ||
            data.data === "patch" ||
            data.data === "delete" ? (
              <>
                <div className="textBox">
                  <Check />
                  <span>
                    "{String(data.Name)}" 습관이{" "}
                    {data.data === "create"
                      ? "생성"
                      : data.data === "patch"
                      ? "수정"
                      : "삭제"}
                    되었습니다.
                  </span>
                </div>
                <Close onClick={() => handleCloseClick(index)} />
              </>
            ) : (
              <>
                <div className="textBox">
                  <Chat />
                  <span className="userName"> {String(data.Name)}</span>
                  <span> {String(data.data)}</span>
                </div>
                <Close onClick={() => handleCloseClick(index)} />
              </>
            )}
          </div>
        ))}
      </AlarmContainer>
    </>
  );
};

const AlarmContainer = styled.div`
  .title {
    display: flex;
    font-size: 20px;
    font-weight: bolder;
    padding: 30px;
    align-items: center;

    > svg {
      margin-right: 20px;
    }
  }

  .message {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #969696;
    > svg {
      margin-right: 20px;
    }
  }

  .textBox {
    margin: 0;
    padding: 20px;
    display: flex;
    font-size: 12px;
    width: 100%;
    align-items: center;
    justify-content: left;
    > svg {
      margin-right: 20px;
    }

    .userName {
      font-weight: bolder;
      margin-right: 10px;
    }
  }
`;

export default AlarmBox;
