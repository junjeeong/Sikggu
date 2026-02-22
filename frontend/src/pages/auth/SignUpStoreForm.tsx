import { authApi } from "@/api/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthPageLayout from "../../components/layout/AuthPageLayout";
import GoogleIcon from "../../components/svg/GoogleIcon";
import KakaoIcon from "../../components/svg/KakaoIcon";

const SignUpStoreForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nickname: "",
    phoneNumber: "",
    storeName: "",
    storeContactNumber: "",
    address: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      // DTO 구조에 맞춰 데이터 가공
      const signUpData = {
        email: formData.email,
        password: formData.password,
        nickname: formData.nickname,
        phoneNumber: formData.phoneNumber,
        role: "STORE" as const,
        storeName: formData.storeName,
        storeContactNumber: formData.storeContactNumber,
        address: formData.address,
        latitude: null,
        longitude: null,
      };

      await authApi.storeSignUp(signUpData);

      alert("사장님 회원가입이 완료되었습니다! 로그인 후 상점을 관리해보세요.");
      navigate("/sign-in");
    } catch (error: any) {
      const message =
        error.response?.data?.message || "회원가입 중 오류가 발생했습니다.";
      alert(message);
    }
  };

  return (
    <AuthPageLayout role="사장님" signInOrSignup="회원가입">
      <form onSubmit={handleSubmit} className="mt-4">
        <label htmlFor="email" className="block font-bold text-sikggu-gray-700">
          이메일
        </label>
        <input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요."
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary text-sikggu-gray"
        />

        <label
          htmlFor="password"
          className="block font-bold text-sikggu-gray-700"
        >
          비밀번호
        </label>
        <input
          id="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="영문, 숫자, 특수문자 중 2가지 포함 8~20자"
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
        />

        <label
          htmlFor="confirmPassword"
          className="block font-bold text-sikggu-gray-700"
        >
          비밀번호 확인
        </label>
        <input
          id="confirmPassword"
          type="password"
          value={formData.confirmPassword}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력해주세요."
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
        />

        <label
          htmlFor="nickname"
          className="block font-bold text-sikggu-gray-700"
        >
          닉네임
        </label>
        <input
          id="nickname"
          type="text"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요."
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
        />

        <label
          htmlFor="phoneNumber"
          className="block font-bold text-sikggu-gray-700"
        >
          전화번호
        </label>
        <input
          id="phoneNumber"
          type="text"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="010-1234-1234"
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
        />

        <label
          htmlFor="storeName"
          className="block font-bold text-sikggu-gray-700"
        >
          상점 이름
        </label>
        <input
          id="storeName"
          type="text"
          value={formData.storeName}
          onChange={handleChange}
          placeholder="상점 이름을 입력해주세요."
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
        />

        <label
          htmlFor="storeContactNumber"
          className="block font-bold text-sikggu-gray-700"
        >
          상점 전화번호
        </label>
        <input
          id="storeContactNumber"
          type="text"
          value={formData.storeContactNumber}
          onChange={handleChange}
          placeholder="02-123-1234"
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
        />

        <label
          htmlFor="address"
          className="block font-bold text-sikggu-gray-700"
        >
          상점 위치
        </label>
        <input
          id="address"
          type="text"
          value={formData.address}
          onChange={handleChange}
          placeholder="서울시 마포구 독막로 20길 17"
          className="w-full px-6 py-4 my-4 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
        />

        <button
          type="submit"
          className="flex items-center justify-center w-full py-4 my-6 text-lg font-semibold text-white transition rounded-xl bg-sikggu-primary hover:bg-sikggu-primary-500/90"
        >
          회원가입
        </button>
        <div className="flex items-center justify-between w-full h-20 px-4 my-6 rounded-xl bg-sikggu-primary-50">
          <span className="text-sikggu-gray-500 ">간편 회원가입하기</span>
          <div className="flex gap-4">
            <GoogleIcon />
            <KakaoIcon />
          </div>
        </div>
        <span className="flex justify-center w-full text-sikggu-gray-500">
          식구 계정이 있으신가요?
          <Link
            to={"/sign-in"}
            className="ml-2 underline cursor-pointer ml-3font-medium text-sikggu-primary-500 hover:text-sikggu-primary-700"
          >
            로그인
          </Link>
        </span>
      </form>
    </AuthPageLayout>
  );
};

export default SignUpStoreForm;
