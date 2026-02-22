import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authApi } from "@/api/auth";
import { Link, useNavigate } from "react-router-dom";
import AuthPageLayout from "../../components/layout/AuthPageLayout";
import GoogleIcon from "../../components/svg/GoogleIcon";
import KakaoIcon from "../../components/svg/KakaoIcon";

const signUpSchema = z
  .object({
    email: z.string().email("이메일 형식이 올바르지 않습니다."),
    password: z.string().min(8, "비밀번호는 8자 이상이어야 합니다."),
    confirmPassword: z.string(),
    nickname: z.string().min(2, "닉네임은 2자 이상이어야 합니다."),
    phoneNumber: z.string().min(10, "전화번호를 확인해주세요."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다.",
    path: ["confirmPassword"],
  });

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUpUserForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data: SignUpFormValues) => {
    try {
      await authApi.userSignUp({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        phoneNumber: data.phoneNumber,
        role: "USER" as const,
      });

      alert("✅ 회원가입이 완료되었습니다! 로그인 페이지로 이동합니다.");
      navigate("/sign-in");
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "❌ 회원가입에 실패했습니다.";
      alert(errorMessage);
    }
  };

  return (
    <AuthPageLayout role="자취생" signInOrSignup="회원가입">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block font-bold text-sikggu-gray-700">
            이메일
          </label>
          <input
            id="email"
            type="email"
            placeholder="이메일을 입력해주세요."
            className="w-full px-6 py-4 mt-2 mb-2 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
            {...register("email")}
          />
          {errors.email && (
            <p className="mb-2 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className="block font-bold text-sikggu-gray-700">
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="8자 이상 입력해주세요"
            className="w-full px-6 py-4 mt-2 mb-2 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
            {...register("password")}
          />
          {errors.password && (
            <p className="mb-2 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block font-bold text-sikggu-gray-700">
            비밀번호 확인
          </label>
          <input
            id="confirmPassword"
            type="password"
            placeholder="비밀번호를 다시 입력해주세요."
            className="w-full px-6 py-4 mt-2 mb-2 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="mb-2 text-sm text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Nickname */}
        <div>
          <label htmlFor="nickname" className="block font-bold text-sikggu-gray-700">
            닉네임
          </label>
          <input
            id="nickname"
            type="text"
            placeholder="닉네임을 입력해주세요."
            className="w-full px-6 py-4 mt-2 mb-2 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
            {...register("nickname")}
          />
          {errors.nickname && (
            <p className="mb-2 text-sm text-red-500">{errors.nickname.message}</p>
          )}
        </div>

        {/* Phone Number */}
        <div>
          <label htmlFor="phoneNumber" className="block font-bold text-sikggu-gray-700">
            전화번호
          </label>
          <input
            id="phoneNumber"
            type="text"
            placeholder="010-1234-5678"
            className="w-full px-6 py-4 mt-2 mb-2 border rounded-xl bg-sikggu-gray-100 border-sikggu-gray-300 focus:border-sikggu-primary"
            {...register("phoneNumber")}
          />
          {errors.phoneNumber && (
            <p className="mb-2 text-sm text-red-500">{errors.phoneNumber.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex items-center justify-center w-full py-4 my-6 text-lg font-semibold text-white transition rounded-xl bg-sikggu-primary hover:bg-sikggu-primary-500/90 disabled:bg-gray-400"
        >
          {isSubmitting ? "가입 중..." : "회원가입"}
        </button>

        {/* Social Login & Sign In Link */}
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

export default SignUpUserForm;