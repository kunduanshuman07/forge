import { projectApi } from "@/lib/api";

import type {
    ApiResponse,
} from "@/types/auth.types";

import type {
    CreateSnapshotFileDto,
    SnapshotFile,
} from "@/types/snapshot-file.types";

export const snapshotFileService = {

    create(
        snapshotId: string,
        data: CreateSnapshotFileDto,
    ) {
        return projectApi.post<ApiResponse<SnapshotFile>>(
            `/forge-bug-engine/snapshot-files/${snapshotId}`,
            data,
        );
    },

};