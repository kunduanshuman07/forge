import { useQuery } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";

export function useProject(
    projectId: string,
) {
    return useQuery({
        queryKey: ["project", projectId],

        enabled: !!projectId,

        queryFn: async () => {
            const response =
                await projectService.getProject(projectId);

            return response.data.data;
        },
    });
}