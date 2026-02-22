import { create } from "zustand";

interface AuthState {
  token: string | null;
  setToken: (token: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("accessToken"),
  isAuthenticated: !!localStorage.getItem("accessToken"),
  setToken: (token) => {
    localStorage.setItem("accessToken", token);
    set({ token, isAuthenticated: true });
  },
  logout: () => {
    localStorage.removeItem("accessToken");
    set({ token: null, isAuthenticated: false });
  },
}));
