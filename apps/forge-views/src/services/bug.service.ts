import { projectApi } from "@/lib/api";
import type {
    Bug,
    PaginatedResponse,
} from "@/types/bug.types";

export const bugService = {
    getProjectBugs(projectId: string) {
        return projectApi.get<PaginatedResponse<Bug>>(
            `/forge-bug-engine/bugs?projectId=${projectId}`,
        );
    },

    getBugById(bugId: string) {
        return projectApi.get<Bug>(
            `forge-bug-engine/bugs/${bugId}`,
        );
    },
};