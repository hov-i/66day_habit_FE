import axios from "axios";

const DOMAIN = "http://localhost:8080";
const VERSION = "v1";

const AxiosAPI = {
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
