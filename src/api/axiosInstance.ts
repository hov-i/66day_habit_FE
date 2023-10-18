import axios from "axios";
const DOMAIN = "https://localhost:8080";
const VERSION = "v1";

// Axios 인스턴스 생성
const axiosInstance = axios.create({
  baseURL: `${DOMAIN}/${VERSION}`,
  withCredentials: true, // 쿠키 포함 설정
});

// AccessToken을 요청 헤더에 추가
axiosInstance.interceptors.request.use(
  (config) => {
    // AccessToken을 localStorage에서 가져오기
    const accessToken = localStorage.getItem("accessToken");

    // AccessToken이 존재하면 요청 헤더에 추가
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

//AccessToken 갱신
axiosInstance.interceptors.response.use(
  async (response) => {
    // 여기에서 response를 처리할 수 있으며, 필요한 경우 작업을 수행할 수 있습니다.
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    const TokenAPI = axios.create({
      baseURL: DOMAIN, // 기본 url 주소 설정
      withCredentials: true, // 쿠키를 받고 전송하기 위한 설정
    });

    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        const refreshResponse = await TokenAPI.post(`${VERSION}/auth/refresh`);
        const newAccessToken = refreshResponse.data.data.accessToken;
        if (newAccessToken) {
          // 토큰 갱신에 성공하면, 새로운 accessToken을 localStorage에 저장
          localStorage.setItem("accessToken", newAccessToken);
          console.log("토큰 업데이트 성공");
        }

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("refreshtoken 토큰 실패:", refreshError);

        setTimeout(() => {
          window.location.href = "/";
        }, 30000); // 30초 동안 대기
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
