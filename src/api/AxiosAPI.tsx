import axios from "axios";
import axiosInstance from "./axiosInstance";

const DOMAIN = "https://localhost:8080";
const VERSION = "v1";

const AuthAPI = axios.create({
  baseURL: DOMAIN, // 기본 url 주소 설정
  withCredentials: true, // 쿠키를 받고 전송하기 위한 설정
});

const AxiosAPI = {
  // 로그인
  login: async (email: string, password: string) => {
    const loginUser = {
      email: email,
      password: password,
    };

    try {
      const response = await AuthAPI.post(
        `${VERSION}/auth/signIn/direct`,
        loginUser
      );

      const accessToken = response.data.data.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      const storedValue = localStorage.getItem("accessToken");
      console.log(storedValue); // 저장된 액세스 토큰 출력
      return response;
    } catch (error) {
      throw error;
    }
  },

  //회원 가입
  signup: async (
    email: string,
    username: string,
    password: string,
    introduction: string
  ) => {
    const SignupUser = {
      email,
      username,
      password,
      introduction,
    };
    try {
      return await axios.post(`${DOMAIN}/${VERSION}/member/direct`, SignupUser);
    } catch (error) {
      throw error;
    }
  },

  //이메일 체크
  emailCheck: async (email: string) => {
    const EmailCheck = email;
    try {
      return await axios.get(
        `${DOMAIN}/${VERSION}/member/email?email=${EmailCheck}`
      );
    } catch (error) {
      throw error;
    }
  },

  //메인 내 정보 보기
  mainUserInfo: async () => {
    try {
      return await axiosInstance.get("/member");
    } catch (error) {
      throw error;
    }
  },

  //내 정보 보기
  userInfo: async () => {
    try {
      return await axiosInstance.get("/member/detail");
    } catch (error) {
      throw error;
    }
  },

  //내 정보 수정
  userInfoChange: async (
    username: string,
    introduction: string,
    profileImage: File | null,
    backgroundImage: File | null
  ) => {
    const userInfo = {
      username,
      introduction,
      profileImage,
      backgroundImage,
    };
    try {
      return await axiosInstance.patch(`${DOMAIN}/${VERSION}/member`, userInfo);
    } catch (error) {
      throw error;
    }
  },

  //이메일 수정
  userEmailChange: async (newEmail: string) => {
    const Email = {
      newEmail,
    };
    try {
      return await axiosInstance.put(
        `${DOMAIN}/${VERSION}/member/email`,
        Email
      );
    } catch (error) {
      throw error;
    }
  },

  //비밀번호 수정
  userPwdChange: async (currentPassword: string, newPassword: string) => {
    const Pwd = {
      currentPassword,
      newPassword,
    };
    try {
      return await axiosInstance.put(
        `${DOMAIN}/${VERSION}/member/password`,
        Pwd
      );
    } catch (error) {
      throw error;
    }
  },

  //회원 탈퇴
  userDelete: async (checkPassword: string) => {
    try {
      return await axiosInstance.delete(`${DOMAIN}/${VERSION}/member`, {
        data: {
          checkPassword,
        },
      });
    } catch (error) {
      throw error;
    }
  },
};

export default AxiosAPI;
