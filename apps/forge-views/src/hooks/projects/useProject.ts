import { useQuery } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";

export function useProject(projectId?: string) {
    return useQuery({
        queryKey: ["project", projectId],

        queryFn: async () => {
            if (!projectId) {
                throw new Error("Project ID is required");
            }

            const response =
                await projectService.getProject(projectId);
            return response.data;
        },

        enabled: Boolean(projectId),

        staleTime: 5 * 60 * 1000,
    });
}