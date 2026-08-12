import { projectApi } from "@/lib/api";
import type { ApiResponse } from "@/types/auth.types";
import type {
    Bug,
    BugSnapshot,
    CreateBugDto,
    PaginatedResponse,
} from "@/types/bug.types";

export const bugService = {
    getProjectBugs(projectId: string) {
        return projectApi.get<PaginatedResponse<Bug>>(
            `/forge-bug-engine/bugs?projectId=${projectId}`,
        );
    },

    getBugById(bugId?: string) {
        return projectApi.get<Bug>(
            `/forge-bug-engine/bugs/${bugId}`,
        );
    },

    createBug(
        projectId: string,
        data: CreateBugDto,
      ) {
        return projectApi.post<ApiResponse<Bug>>(
          `/forge-bug-engine/bugs/${projectId}`,
          data,
        );
      },
};

export const bugSnapshotService = {

    getSnapshots(bugId: string) {
        return projectApi.get<
            ApiResponse<BugSnapshot[]>
        >(
            `/forge-bug-engine/bug-snapshots?bugId=${bugId}`,
        );
    },

    getSnapshot(snapshotId: string) {
        return projectApi.get<
            ApiResponse<BugSnapshot>
        >(
            `/forge-bug-engine/bug-snapshots/${snapshotId}`,
        );
    },

};