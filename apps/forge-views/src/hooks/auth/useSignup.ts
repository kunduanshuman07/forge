// src/hooks/auth/useSignup.ts

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import type { SignupDto } from "@/types/auth.types";
import type { AxiosError } from "axios";
import type { ApiError } from "@/types/api-error";

export function useSignup() {
    const navigate = useNavigate();
  
    return useMutation({
      mutationFn: async (dto: SignupDto) => {
        const { data } = await authService.signup(dto);
        return data;
      },
  
      onSuccess: (response) => {
        toast.success(response.message);
  
        navigate("/login", {
          replace: true,
        });
      },
  
      onError: (error: AxiosError<ApiError>) => {
        toast.error(
          error.response?.data.message ??
            "Unable to create account."
        );
      },
    });
  }