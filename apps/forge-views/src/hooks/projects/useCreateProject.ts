import { useMutation, useQueryClient } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";
import type { CreateProjectDto } from "@/types/project.types";

export function useCreateProject() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: CreateProjectDto) =>
            projectService.createProject(data),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["projects"],
            });
        },
    });
}