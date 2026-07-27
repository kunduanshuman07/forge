// src/hooks/auth/useLogout.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/stores/auth.store";
import type { ApiError } from "@/types/api-error";

export function useLogout() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const clearAuth = useAuthStore((state) => state.logout);

    return useMutation({
        mutationFn: async () => {
            const { data } = await authService.logout();
            return data;
        },

        onSuccess: (response) => {
            clearAuth();

            queryClient.clear();

            toast.success(response.message);

            navigate("/", {
                replace: true,
            });
        },

        onError: (error: AxiosError<ApiError>) => {
            toast.error(
                error.response?.data.message ?? "Logout failed."
            );
        },
    });
}