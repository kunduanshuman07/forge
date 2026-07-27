// src/services/auth.service.ts

import { api } from "@/lib/axios";

import type {
  ApiResponse,
  AuthPayload,
  LoginDto,
  SignupDto,
  User,
} from "@/types/auth.types";

export const authService = {
  signup(data: SignupDto) {
    return api.post<ApiResponse<AuthPayload>>("/forge-auth/auth/signup", data);
  },

  login(data: LoginDto) {
    return api.post<ApiResponse<AuthPayload>>("/forge-auth/auth/login", data);
  },

  me() {
    return api.get<ApiResponse<User>>("/forge-auth/auth/me");
  },

  refresh() {
    return api.post<ApiResponse<AuthPayload>>("/forge-auth/auth/refresh");
  },

  logout() {
    return api.post<ApiResponse<void>>("/forge-auth/auth/logout");
  },

  verifyEmail(token: string) {
    return api.get<ApiResponse<void>>(`/forge-auth/auth/verify-email/${token}`);
  },
};