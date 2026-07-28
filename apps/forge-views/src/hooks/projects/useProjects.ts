import { useQuery } from "@tanstack/react-query";

import { projectService } from "@/services/project.service";

export function useProjects() {
    return useQuery({
        queryKey: ["projects"],

        queryFn: async () => {
            const response =
                await projectService.getProjects();

            return response.data.data;
        },
    });
}