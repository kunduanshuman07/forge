// src/services/bug-snapshot.service.ts

import { projectApi } from "@/lib/api";

import type {
    ApiResponse,
} from "@/types/auth.types";

import type {
    BugSnapshot,
    CreateBugSnapshotDto,
} from "@/types/bug-snapshot.types";

export const bugSnapshotService = {
    createSnapshot(
        bugId: string,
        data: CreateBugSnapshotDto,
    ) {
        return projectApi.post<
            ApiResponse<BugSnapshot>
        >(
            `/forge-bug-engine/bug-snapshots/${bugId}`,
            data,
        );
    },
};