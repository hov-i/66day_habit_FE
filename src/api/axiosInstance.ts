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
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      try {
        await axios.post(`${DOMAIN}/auth/refreshtoken`, null, {
          withCredentials: true,
        });
        console.log("쿠키 업데이트 성공");
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/main";
        console.log("refreshtoken 토큰 실패:", refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
