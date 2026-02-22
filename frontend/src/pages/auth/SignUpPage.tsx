import SignUpIntroPage from "@/pages/auth/SignUpIntroPage";
import SignUpStoreForm from "@/pages/auth/SignUpStoreForm";
import SignUpUserForm from "@/pages/auth/SignUpUserForm";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "@/store/useAuthStore";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type") || "intro";
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      alert('🔔 계정이 로그인 되어 있어 "/stores" 페이지로 리다이렉트 됩니다.');
      navigate("/stores", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  if (type === "intro") {
    return <SignUpIntroPage />;
  } else if (type === "user") {
    return <SignUpUserForm />;
  } else if (type === "store") {
    return <SignUpStoreForm />;
  }
  return null;
};

export default SignUpPage;