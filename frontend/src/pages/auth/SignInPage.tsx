import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authApi } from "@/api/auth";
import AuthPageLayout from "@/components/layout/AuthPageLayout";
import GoogleIcon from "@/components/svg/GoogleIcon";
import KakaoIcon from "@/components/svg/KakaoIcon";
import { useAuthStore } from "@/store/useAuthStore";

// Zod Schema
const signInSchema = z.object({
  email: z.string().email("올바른 이메일 형식을 입력해주세요."),
  password: z.string().min(1, "비밀번호를 입력해주세요."),
});

type SignInFormValues = z.infer<typeof signInSchema>;

const SignInPage = () => {
  const navigate = useNavigate();
  const { setToken, isAuthenticated } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
  });

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/stores", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = async (data: SignInFormValues) => {
    try {
      const response = await authApi.signIn({
        email: data.email,
        password: data.password,
      });

      // Update global state
      setToken(response.accessToken);
      
      alert("✅ 성공적으로 로그인되었습니다.");
      navigate("/stores");
    } catch (error: any) {
      console.error("Login Error:", error);
      const errorMessage =
        error.response?.data?.message ||
        "❌ 로그인에 실패했습니다. 아이디와 비밀번호를 확인해주세요.";
      alert(errorMessage);
    }
  };

  return (
    <AuthPageLayout>
      <Link to="/" className="flex justify-center mt-6">
        <img
          src="/images/logo_typo.png"
          width={400}
          alt="SIKGGU"
          className="flex"
        />
      </Link>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        <div>
          <label htmlFor="email" className="block font-bold text-sikggu-gray-700">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            className="w-full px-6 py-4 mt-2 mb-2 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary text-sikggu-gray"
            {...register("email")}
          />
          {errors.email && (
            <p className="mb-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password"
            className="block font-bold text-sikggu-gray-700"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="w-full px-6 py-4 mt-2 mb-2 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
            {...register("password")}
          />
          {errors.password && (
            <p className="mb-2 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center w-full py-4 my-6 text-lg font-semibold text-white transition rounded-xl bg-sikggu-primary hover:bg-sikggu-primary-500/90 disabled:bg-gray-400"
        >
          {isSubmitting ? "로그인 중..." : "로그인"}
        </button>

        <div className="flex items-center justify-between w-full h-20 px-4 my-6 rounded-xl bg-sikggu-primary-50">
          <span className="text-sikggu-gray-500 ">간편 로그인하기</span>
          <div className="flex gap-4">
            <GoogleIcon />
            <KakaoIcon />
          </div>
        </div>
        <span className="flex justify-center w-full text-sikggu-gray-500">
          식구가 처음이신가요?
          <Link
            to={"/sign-up?type=intro"}
            className="ml-2 underline cursor-pointer ml-3font-medium text-sikggu-primary-500 hover:text-sikggu-primary-700"
          >
            회원가입
          </Link>
        </span>
      </form>
    </AuthPageLayout>
  );
};

export default SignInPage;