import { useQuery } from "@tanstack/react-query";

import { authService } from "@/services/auth.service";

export function useCurrentUser(enabled = true) {
  return useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      const response = await authService.me();
      return response.data.data;
    },
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000,
  });
}