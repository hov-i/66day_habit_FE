import axios from "axios";

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

      // 토큰을 응답에서 추출
      const accessToken = response.data.accessToken;
      console.log(accessToken);

      // 추출한 토큰을 localStorage에 저장
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

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
    introduce: string
  ) => {
    const SignupUser = {
      email,
      username,
      password,
      introduce,
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
};

export default AxiosAPI;
