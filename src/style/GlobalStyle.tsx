import { createGlobalStyle } from "styled-components";
import NotoSansRegular from "../resources/fonts/NotoSansKR-Regular.woff2";
// 전역스타일링: 모든 곳에 쓰이는 style입니다.
const GlobalStyle = createGlobalStyle`

  *, *::before, *::after {
    box-sizing: border-box;
  }

  @font-face {
    font-family: "Noto Sans KR";
    src: url(${NotoSansRegular}) format("woff2");
  }
  
  html {
    font-size: 62.5%; // 10px = 1rem;
    font-family: "Noto Sans KR";// 폰트 설정
  }  

  button{
    font-family: "Noto Sans KR";// 폰트 설정
    all: unset; 
    cursor:pointer;
  }

  div{
    font-family: "Noto Sans KR";// 폰트 설정
  }

  input{
    font-family: "Noto Sans KR";// 폰트 설정
  }

  
  body {
    font-family: "Noto Sans KR";// 폰트 설정
    background: #363636;
    width: 100%;
    min-height: 100vh;
    margin: 0 auto;
  }
`;

export default GlobalStyle;
