import { useQuery } from "@tanstack/react-query";
import { bugService } from "@/services/bug.service";

export function useBugs(projectId: string) {
    return useQuery({
        queryKey: ["bugs", projectId],
        enabled: !!projectId,
        queryFn: async () => {
            const response =
                await bugService.getProjectBugs(projectId);

            return response.data;
        },
    });
}

export function useBug(bugId: string) {
    return useQuery({
        queryKey: ["bug", bugId],
        enabled: !!bugId,
        queryFn: async () => {
            const response =
                await bugService.getBugById(bugId);

            return response.data;
        },
    });
}