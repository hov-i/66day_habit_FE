import React, { useEffect, useRef, useState } from "react";
import Box from "../components/common/Box";
import styled from "styled-components";
import { ReactComponent as Back } from "../resources/Icons/back.svg";
import { useNavigate } from "react-router-dom";
import BubbleBox from "../components/SignUp/BubbleBox";
import NextButton from "../components/common/NextButton";
import useViewport from "../util/viewportHook";
import AxiosAPI from "../api/AxiosAPI";

const SignPage = () => {
  const { isMobile } = useViewport();
  const navigate = useNavigate();
  const [step, setStep] = useState<number>(1);
  const [active, setActive] = useState<boolean>(false);

  const [inputEmail, setInputEmail] = useState<string>("");
  const [inputName, setInputName] = useState<string>("");
  const [inputPwd, setInputPwd] = useState<string>("");
  const [inputConPwd, setInputConPwd] = useState<string>("");
  const [inputAboutMe, setInputAboutMe] = useState<string>("");

  // 유효성 검사
  const [isName, setIsName] = useState<boolean>(false);
  const [isAboutMe, setIsAboutMe] = useState<boolean>(false);
  const [isEmail, setIsEmail] = useState<boolean>(false);
  const [isPwd, setIsPwd] = useState<boolean>(false);
  const [isConPwd, setIsConPwd] = useState<boolean>(false);

  const [emailCheck, setEmailCheck] = useState<boolean>(false);

  useEffect(() => {
    if (step === 1 && inputName && isName) {
      setActive(true);
    } else if (step === 2 && inputAboutMe && isAboutMe) {
      setActive(true);
    } else if (step === 4 && inputPwd && isPwd) {
      setActive(true);
    } else if (step === 3 && inputEmail && isEmail) {
      const postEmail = async () => {
        try {
          const response = await AxiosAPI.emailCheck(inputEmail);
          if (response.status === 200) {
            console.log("이메일 체크 완료");
            setEmailCheck(true);
            setActive(true);
          }
        } catch (error) {
          console.log("이메일 체크 실패");
          setEmailCheck(false);
          setActive(false);
        }
      };
      postEmail();
    } else if (step === 5 && inputConPwd && isConPwd) {
      setActive(true);
    } else if (step === 6) {
      console.log(
        { inputEmail },
        { inputName },
        { inputPwd },
        { inputAboutMe }
      );
      const postSignUp = async () => {
        try {
          const response = await AxiosAPI.signup(
            inputEmail,
            inputName,
            inputPwd,
            inputAboutMe
          );
          if (response.status === 200) {
            console.log("회원가입 성공");
            setTimeout(() => {
              navigate("/");
            }, 1700);
          }
        } catch (error) {
          console.log("회원가입 실패");
        }
      };
      postSignUp();
    } else {
      setActive(false);
    }
  }, [
    inputName,
    isName,
    inputAboutMe,
    isAboutMe,
    inputPwd,
    isPwd,
    inputEmail,
    isEmail,
    inputConPwd,
    isConPwd,
    step,
    navigate,
  ]);

  useEffect(() => {
    scrollToBottom();
  }, [step]);

  // 이메일 체크
  const onChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailRegEx = /^[a-zA-Z0-9+-/_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const emailCurrent = e.target.value;
    setInputEmail(e.target.value);
    setIsEmail(emailRegEx.test(emailCurrent));
    setActive(emailRegEx.test(emailCurrent));
  };

  // 비밀번호 체크
  // 정규식: 영문, 숫자, 특수문자 포함 8~20자
  const onChangePwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwdRegex =
      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[$`~!@%*#^?&\\()\-_=+]).{8,20}$/;
    const pwdCurrent = e.target.value;
    setInputPwd(pwdCurrent);
    setIsPwd(pwdRegex.test(pwdCurrent));
    setActive(pwdRegex.test(pwdCurrent));
  };
  // 비밀번호 확인
  const onChangeConPwd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const conPwdCurrent = e.target.value;
    setInputConPwd(conPwdCurrent);
    setIsConPwd(conPwdCurrent === inputPwd);
    setActive(conPwdCurrent === inputPwd);
  };
  const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameRegex = /^[가-힣a-zA-Z\s]{1,}$/;
    const NameCurrent = e.target.value;
    setInputName(NameCurrent);
    setIsName(nameRegex.test(NameCurrent));
    setActive(nameRegex.test(NameCurrent));
  };
  const onChangeAboutMe = (e: React.ChangeEvent<HTMLInputElement>) => {
    const aboutRegex = /^[가-힣a-zA-Z\s]{1,}$/;
    const AboutMeCurrent = e.target.value;
    setInputAboutMe(AboutMeCurrent);
    setIsAboutMe(aboutRegex.test(AboutMeCurrent));
    setActive(aboutRegex.test(AboutMeCurrent));
  };

  const handleNextClick = () => {
    setStep(step + 1);
  };

  const bottom = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    bottom.current?.parentElement?.scrollTo(0, 10000);
  };

  return (
    <Box>
      <SignUpContainer $isMobile={isMobile} $step={step} ref={bottom}>
        <div className="backButton">
          <Back onClick={() => navigate("/")} />
        </div>
        <div className="nextClick">
          <NextButton disabled={!active} onClick={handleNextClick} />
        </div>

        <div className="container">
          {step >= 1 && (
            <>
              <BubbleBox name="left" type="sign">
                만나서 반가워요!
                <br /> 당신의 이름은 무엇인가요?
              </BubbleBox>
              {inputName ? (
                isName ? (
                  <p className="inputCheck"> &nbsp;</p>
                ) : (
                  <p className="inputCheck">이름을 확인해주세요</p>
                )
              ) : (
                <p className="inputCheck"> &nbsp;</p>
              )}
              <BubbleBox name="right" type="sign">
                당신의 이름은?
                {step === 1 ? (
                  <input
                    className="input"
                    type="text"
                    value={inputName}
                    onChange={onChangeName}
                  />
                ) : (
                  <p className="inputText">{inputName}</p>
                )}
              </BubbleBox>
            </>
          )}

          {step >= 2 && (
            <>
              <BubbleBox name="left" type="sign">
                정말 멋진 이름이네요!
                <br /> 당신을 한마디로 소개한다면?
              </BubbleBox>
              {inputAboutMe ? (
                isAboutMe ? (
                  <p className="inputCheck"> &nbsp;</p>
                ) : (
                  <p className="inputCheck">자기소개를 확인해주세요</p>
                )
              ) : (
                <p className="inputCheck"> &nbsp;</p>
              )}
              <BubbleBox name="right" type="sign">
                당신의 자기소개는?{" "}
                {step === 2 ? (
                  <input
                    className="input"
                    type="text"
                    value={inputAboutMe}
                    onChange={onChangeAboutMe}
                  />
                ) : (
                  <p className="inputText">{inputAboutMe}</p>
                )}
              </BubbleBox>
            </>
          )}

          {step >= 3 && (
            <>
              <BubbleBox name="left" type="sign">
                정말 멋져요!
                <br />
                우리.. 친해지고 싶은데
                <br />
                연락할 이메일 좀 알려줄 수 있을까요?
              </BubbleBox>
              {inputEmail ? (
                isEmail ? (
                  emailCheck ? (
                    <p className="inputCheck"> &nbsp;</p>
                  ) : (
                    <p className="inputCheck">이미 있는 이메일이에요</p>
                  )
                ) : (
                  <p className="inputCheck">이메일 주소를 확인해주세요</p>
                )
              ) : (
                <p className="inputCheck"> &nbsp;</p>
              )}
              <BubbleBox name="right" type="sign">
                당신의 이메일은?{" "}
                {step === 3 ? (
                  <input
                    className="input"
                    type="email"
                    value={inputEmail}
                    onChange={onChangeEmail}
                  />
                ) : (
                  <p className="inputText">{inputEmail}</p>
                )}
              </BubbleBox>
            </>
          )}

          {step >= 4 && (
            <>
              <BubbleBox name="left" type="sign">
                고마워요!
                <br />
                더 찐한 사이가 되고 싶은데
                <br />
                우리만의 비밀번호를 알려주세요!
              </BubbleBox>
              {inputPwd ? (
                isPwd ? (
                  <p className="inputCheck">&nbsp;</p>
                ) : (
                  <p className="inputCheck">비밀번호를 확인해주세요.</p>
                )
              ) : (
                <p className="inputCheck"> &nbsp;</p>
              )}
              <BubbleBox name="right" type="sign">
                당신의 비밀번호는?{" "}
                {step === 4 ? (
                  <input
                    className="input"
                    type="password"
                    value={inputPwd}
                    onChange={onChangePwd}
                  />
                ) : (
                  <p className="inputText">{"*".repeat(inputPwd.length)}</p>
                )}
              </BubbleBox>
            </>
          )}
          {step >= 5 && (
            <>
              <BubbleBox name="left" type="sign">
                좀 더 확실하게 <br />
                다시 한번만 더 알려주세요!
              </BubbleBox>
              {inputConPwd ? (
                isConPwd ? (
                  <p className="inputCheck">&nbsp;</p>
                ) : (
                  <p className="inputCheck">같은 비밀번호를 입력해주세요</p>
                )
              ) : (
                <p className="inputCheck"> &nbsp;</p>
              )}
              <BubbleBox name="right" type="sign">
                비밀번호 재입력{" "}
                {step === 5 ? (
                  <input
                    className="input"
                    type="password"
                    value={inputConPwd}
                    onChange={onChangeConPwd}
                  />
                ) : (
                  <p className="inputText">{"*".repeat(inputConPwd.length)}</p>
                )}
              </BubbleBox>
            </>
          )}
          {step >= 6 && (
            <BubbleBox name="left" type="sign">
              이제 준비가 다 되었어요!
              <br />
              멋진 습관을 만들러 가볼까요?
            </BubbleBox>
          )}
        </div>
      </SignUpContainer>
    </Box>
  );
};

const SignUpContainer = styled.div<{ $isMobile: boolean; $step: number }>`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;

  .nextClick {
    position: fixed;
    bottom: 0;
    padding: 50px;
    z-index: 1;
    display: flex;
    align-items: right;
    justify-content: right;
    width: ${(props) => (props.$isMobile ? "100%" : "768px")};
  }
  .container {
    padding: 30px;
    padding-top: 100px;
    padding-bottom: 100px;
  }

  .backButton {
    padding: 30px;
    position: fixed;
    z-index: 999;
    > svg {
      fill: black;
      cursor: pointer;
    }
  }

  .input {
    display: block;
    width: 100%;
    border: none;
    border-bottom: 1px solid black;
    outline: none;
    background: transparent;
    font-size: 16px;
    padding-left: 20px;
    text-align: right;
  }

  .inputCheck {
    color: #ff4040;
    text-align: right;
    padding-top: 30px;
    font-size: 13px;
    padding-right: 25px;
    margin: 10px;
  }

  .inputText {
    color: gray;
    margin: 0;
  }
`;

export default SignPage;
