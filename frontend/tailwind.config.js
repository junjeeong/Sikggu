/** @type {import('tailwindcss').Config} */

const config = {
  // 4단계: tailwind.config.js 설정 참고
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    // 기본 테마(색상, 폰트 등)를 확장합니다.
    extend: {
      colors: {
        // --- SIKGGU 메인 컬러 팔레트 ---
        // SIKGGU 로고의 신선하고 밝은 녹색 계열을 기반으로 합니다.
        "sikggu-primary": {
          DEFAULT: "#6AB94D", // 메인 버튼, 핵심 요소에 사용 (중간 톤)
          50: "#E8F5E5", // 아주 연한 배경색
          100: "#D8EAD3", // 연한 배경색
          300: "#9ACD8A", // 조금 밝은 포인트 색
          500: "#6AB94D", // 메인 색상 (DEFAULT)
          700: "#458532", // 어두운 버튼, 호버(hover) 색상
          900: "#2A511C", // 가장 어두운 텍스트/포인트 색상
        },

        // --- 폼 요소 및 배경 ---
        "sikggu-gray": {
          DEFAULT: "#888888", // 일반 텍스트, 경계선 색상
          100: "#F5F5F5", // 입력 필드/배경색
          300: "#D3D3D3", // 입력 필드 경계선
          500: "#888888", // 일반 텍스트 색상
          700: "#333333", // 제목/강조 텍스트
        },

        // --- 소셜 로그인 버튼 색상 (참고용) ---
        "kakao-yellow": "#FEE500",
        "google-blue": "#4285F4",

        // --- 강조 및 오류 ---
        error: "#E53E3E", // 오류 메시지
        safe: "#38A169", // 성공/안전 메시지
      },

      // SIKGGU 로고의 글씨처럼 둥근 버튼을 위한 radius 확장
      borderRadius: {
        "40px": "40px", // 로그인 버튼의 둥근 모서리
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

export default config;
