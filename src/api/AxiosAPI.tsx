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

  // 회원 가입
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

  // 이메일 체크
  emailCheck: async (email: string) => {
    const EmailCheck = email;
    try {
      return await axios.get(
        `${DOMAIN}/${VERSION}/member/email/check?email=${EmailCheck}`
      );
    } catch (error) {
      throw error;
    }
  },

  // 이메일 조회
  email: async () => {
    try {
      return await axiosInstance.get("/member/email");
    } catch (error) {
      throw error;
    }
  },

  // 메인 내 정보 보기
  mainUserInfo: async () => {
    try {
      return await axiosInstance.get("/member");
    } catch (error) {
      throw error;
    }
  },

  // 내 정보 보기
  userInfo: async () => {
    try {
      return await axiosInstance.get("/member/detail");
    } catch (error) {
      throw error;
    }
  },

  // 내 정보 수정하기
  userInfoChange: async (
    username: string,
    introduction: string,
    profileFile: File | null,
    backGroundFile: File | null
  ) => {
    try {
      const formData = new FormData();
      const memberInfo = {
        username: username,
        introduction: introduction,
      };

      formData.append(
        "memberInfo",
        new Blob([JSON.stringify(memberInfo)], {
          type: "application/json",
        })
      );

      if (profileFile && backGroundFile) {
        formData.append("backgroundImage", backGroundFile);
        formData.append("profileImage", profileFile);
      } else if (profileFile) {
        formData.append("profileImage", profileFile);
      } else if (backGroundFile) {
        formData.append("backgroundImage", backGroundFile);
      }

      return await axiosInstance.patch("/member", formData);
    } catch (error) {
      throw error;
    }
  },

  // 이메일 수정
  userEmailChange: async (newEmail: string) => {
    const Email = {
      newEmail,
    };
    try {
      return await axiosInstance.put("/member/email", Email);
    } catch (error) {
      throw error;
    }
  },

  // 비밀번호 수정
  userPwdChange: async (currentPassword: string, newPassword: string) => {
    const Pwd = {
      currentPassword,
      newPassword,
    };
    try {
      return await axiosInstance.put("/member/password", Pwd);
    } catch (error) {
      throw error;
    }
  },

  // 로그아웃
  logout: async () => {
    try {
      return await axiosInstance.post("/auth/signOut");
    } catch (error) {
      throw error;
    }
  },
  // 회원 탈퇴
  userDelete: async (checkPassword: string) => {
    try {
      return await axiosInstance.delete("/member", {
        data: {
          checkPassword,
        },
      });
    } catch (error) {
      throw error;
    }
  },

  // 습관 추가
  habitCreate: async (
    backgroundColor: string,
    fontColor: string,
    habitName: string,
    habitVisibility: string,
    habitTag: string[]
  ) => {
    const HabitInfo = {
      backgroundColor,
      fontColor,
      habitName,
      habitVisibility,
      habitTag,
    };
    console.log(HabitInfo);
    try {
      return await axiosInstance.post("/habit", HabitInfo);
    } catch (error) {
      throw error;
    }
  },

  // 습관 삭제
  habitDelete: async (habitId: number) => {
    try {
      return await axiosInstance.delete(`/habit/${habitId}`);
    } catch (error) {
      throw error;
    }
  },

  // 습관 수정
  habitChange: async (
    habitId: number,
    backgroundColor: string,
    fontColor: string,
    habitName: string,
    habitVisibility: string,
    habitTag: string[]
  ) => {
    const HabitInfo = {
      backgroundColor,
      fontColor,
      habitName,
      habitVisibility,
      habitTag,
    };
    console.log(HabitInfo);
    try {
      return await axiosInstance.patch(`/habit/${habitId}`, HabitInfo);
    } catch (error) {
      throw error;
    }
  },

  // 습관 더보기
  habitMore: async (habitId: number) => {
    try {
      return await axiosInstance.get(`/habit/detail?habitId=${habitId}`);
    } catch (error) {
      throw error;
    }
  },

  // 습관 기록 조회
  habitRecord: async (habitId: number) => {
    try {
      return await axiosInstance.get(`/habit/record/${habitId}`);
    } catch (error) {
      throw error;
    }
  },

  // 습관 기록 추가
  habitRecordCreate: async (
    dayNumber: number,
    achievementRate: number,
    habitId: number
  ) => {
    const RecordInfo = {
      dayNumber,
      achievementRate,
    };
    console.log(RecordInfo);
    try {
      return await axiosInstance.post(`/habit/record/${habitId}`, RecordInfo);
    } catch (error) {
      throw error;
    }
  },

  // 습관 기록 삭제
  habitRecordDelete: async (habitId: number, dayNumber: number) => {
    try {
      return await axiosInstance.delete(
        `/habit/record/${habitId}?dayNumber=${dayNumber}`
      );
    } catch (error) {
      throw error;
    }
  },

  //습관 기록 수정
  habitRecordChange: async (
    dayNumber: number,
    achievementRate: number,
    habitId: number
  ) => {
    const RecordInfo = {
      achievementRate,
    };
    console.log(RecordInfo);
    try {
      return await axiosInstance.put(
        `/habit/record/${habitId}?dayNumber=${dayNumber}`,
        RecordInfo
      );
    } catch (error) {
      throw error;
    }
  },

  // 내 친구 조회
  friendInfo: async () => {
    try {
      return await axiosInstance.get("/friend/my/following");
    } catch (error) {
      throw error;
    }
  },

  // 친구 회원 정보 조회
  friendUserInfo: async (memberId: number) => {
    try {
      return await axiosInstance.get(`/friend?friendId=${memberId}`);
    } catch (error) {
      throw error;
    }
  },

  //팔로우 하기
  follow: async (memberId: number) => {
    try {
      return await axiosInstance.post(`/friend?followId=${memberId}`);
    } catch (error) {
      throw error;
    }
  },

  // 언팔로우 하기
  unFollow: async (memberId: number) => {
    try {
      return await axiosInstance.delete(`/friend/${memberId}`);
    } catch (error) {
      throw error;
    }
  },

  // 친구 검색
  friendSearch: async (search: string) => {
    try {
      return await axiosInstance.get(`/friend/search?search=${search}`);
    } catch (error) {
      throw error;
    }
  },

  // 명언 랜덤 조회
  randomQuote: async () => {
    try {
      return await axiosInstance.get("/recommend/random/quote");
    } catch (error) {
      throw error;
    }
  },

  // 습관 랜덤 조회
  randomHabit: async () => {
    try {
      return await axiosInstance.get("/recommend/random/habit");
    } catch (error) {
      throw error;
    }
  },

  // 신규 습관 5개 조회
  newHabit: async (page: number) => {
    try {
      return await axiosInstance.get(`/habit/new?page=${page}&limit=5`);
    } catch (error) {
      throw error;
    }
  },

  // 완료 습관 5개 조회
  doneHabit: async (page: number) => {
    try {
      return await axiosInstance.get(`/habit/done?page=${page}&limit=5`);
    } catch (error) {
      throw error;
    }
  },
};

export default AxiosAPI;
