// src/services/auth.service.ts


import { authApi } from "@/lib/api";
import type {
  ApiResponse,
  AuthPayload,
  LoginDto,
  SignupDto,
  User,
} from "@/types/auth.types";

export const authService = {
  signup(data: SignupDto) {
    return authApi.post<ApiResponse<AuthPayload>>("/forge-auth/auth/signup", data);
  },

  login(data: LoginDto) {
    return authApi.post<ApiResponse<AuthPayload>>("/forge-auth/auth/login", data);
  },

  me() {
    return authApi.get<ApiResponse<User>>("/forge-auth/auth/me");
  },

  refresh() {
    return authApi.post<ApiResponse<AuthPayload>>("/forge-auth/auth/refresh");
  },

  logout() {
    return authApi.post<ApiResponse<void>>("/forge-auth/auth/logout");
  },

  verifyEmail(token: string) {
    return authApi.get<ApiResponse<void>>(`/forge-auth/auth/verify-email/${token}`);
  },
};