export type UserRole = "USER" | "STORE";

export interface SignInRequest {
  email: string;
  password: string;
}

export interface UserSignUpRequest {
  email: string;
  password: string;
  nickname: string;
  phoneNumber: string;
  role: UserRole;
}

export interface StoreSignUpRequest extends UserSignUpRequest {
  storeName: string;
  storeContactNumber: string;
  address: string;
}

export interface AuthResponse {
  accessToken: string;
}

export interface SignUpResponse {
  userId: number;
}
