import { projectApi } from "@/lib/api";

import type {
    CreateSubmissionResponse,
} from "@/types/submission.types";

import type {
    SubmissionFile,
    SubmissionFileResponse,
} from "@/types/submission-file.types";

export const submissionService = {
    async createSubmission(
        bugId: string,
    ) {
        const response =
            await projectApi.post<CreateSubmissionResponse>(
                "/forge-bug-engine/submissions",
                {
                    bugId,
                },
            );

        return response.data;
    },

    async getSubmissionFiles(
        submissionId: string,
    ) {
        const response =
            await projectApi.get<SubmissionFileResponse>(
                `/forge-bug-engine/submissions/${submissionId}/files`,
            );

        return response.data;
    },

    async updateSubmissionFile(
        submissionId: string,
        fileId: string,
        content: string,
    ) {
        const response =
            await projectApi.patch<SubmissionFile>(
                `/forge-bug-engine/submissions/${submissionId}/files/${fileId}`,
                {
                    content,
                },
            );

        return response.data;
    },
};