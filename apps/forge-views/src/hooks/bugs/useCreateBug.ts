// src/hooks/bugs/useCreateBug.ts

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { bugService } from "@/services/bug.service";

import type {
    CreateBugDto,
} from "@/types/bug.types";

export function useCreateBug(projectId: string) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateBugDto) =>
            bugService.createBug(projectId, data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bugs", projectId],
            });

            queryClient.invalidateQueries({
                queryKey: ["project", projectId],
            });
        },
    });
}