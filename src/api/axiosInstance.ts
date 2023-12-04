import axios from "axios";
const DOMAIN = "https://66daysstride.store";
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

let isRefreshing = false;

// AccessToken 갱신
axiosInstance.interceptors.response.use(
  async (response) => {
    // 여기에서 response를 처리할 수 있으며, 필요한 경우 작업을 수행할 수 있습니다.
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !isRefreshing) {
      isRefreshing = true;

      try {
        const TokenAPI = axios.create({
          baseURL: DOMAIN,
          withCredentials: true,
        });

        const refreshResponse = await TokenAPI.post(`${VERSION}/auth/refresh`);
        const newAccessToken = refreshResponse.data.data.accessToken;

        if (newAccessToken) {
          // 토큰 갱신에 성공하면, 새로운 accessToken을 localStorage에 저장
          localStorage.setItem("accessToken", newAccessToken);
          console.log("토큰 업데이트 성공");

          // 갱신 완료 후 isRefreshing을 false로 설정
          isRefreshing = false;

          // 원래 요청 재시도
          return axiosInstance(originalRequest);
        }
      } catch (refreshError: any) {
        console.log("refreshtoken 토큰 실패:", refreshError);

        // 에러가 403이 아니면 리다이렉트
        if (refreshError.response?.status === 403) {
          window.location.href = "/";
        }
      } finally {
        // 갱신이 실패하더라도 중복 요청 방지 플래그를 false로 설정
        isRefreshing = false;
      }
    }

    // 여기서 Promise.reject를 호출해야 합니다.
    return Promise.reject(error);
  }
);

export default axiosInstance;
