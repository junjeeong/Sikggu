import type {
  AuthResponse,
  SignInRequest,
  SignUpResponse,
  StoreSignUpRequest,
  UserSignUpRequest,
} from "@/types/auth";
import axiosInstance from "./axiosInstance";

export const authApi = {
  signIn: async (signInData: SignInRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post(
      "/api/v1/auth/sign-in",
      signInData
    );
    return response.data;
  },

  userSignUp: async (
    signUpData: UserSignUpRequest
  ): Promise<SignUpResponse> => {
    const response = await axiosInstance.post(
      "/api/v1/auth/sign-up/user",
      signUpData
    );
    return response.data;
  },

  storeSignUp: async (
    signUpData: StoreSignUpRequest
  ): Promise<SignUpResponse> => {
    const response = await axiosInstance.post(
      "/api/v1/auth/sign-up/store",
      signUpData
    );
    return response.data;
  },
};
