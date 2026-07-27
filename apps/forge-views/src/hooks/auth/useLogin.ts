// src/hooks/auth/useLogin.ts

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type { LoginDto } from "@/types/auth.types";
import { useAuthStore } from "@/stores/auth.store";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/api-error";

export function useLogin() {
    const navigate = useNavigate();
  
    const login = useAuthStore((s) => s.login);
  
    return useMutation({
      mutationFn: async (dto: LoginDto) => {
        const { data } = await authService.login(dto);
        return data;
      },
  
      onSuccess: (response) => {
        login(
          response.data.accessToken,
          response.data.refreshToken,
          response.data.user,
        );
  
        toast.success(response.message);
  
        navigate("/dashboard", {
          replace: true,
        });
      },
  
      onError: (error: AxiosError<ApiError>) => {
        toast.error(
          error.response?.data.message ??
            "Unable to login."
        );
      },
    });
  }