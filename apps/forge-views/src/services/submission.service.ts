import { projectApi } from "@/lib/api";

import type {
    CreateSubmissionResponse,
    SubmissionDetails,
    SubmissionHistoryResponse,
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

    async getUserSubmissions(userId: string) {
        return projectApi.get<SubmissionHistoryResponse>(
            `/forge-bug-engine/submissions?userId=${userId}`,
        );
    },

    async getSubmission(submissionId: string) {
        return projectApi.get<SubmissionDetails>(
            `/forge-bug-engine/submissions/${submissionId}`,
        );
    },

    async getSubmissions(
        userId: string,
        bugId?: string,
    ) {
        const params = new URLSearchParams();

        params.set("userId", userId);

        if (bugId) {
            params.set("bugId", bugId);
        }

        return projectApi.get(
            `/forge-bug-engine/submissions?${params.toString()}`,
        );
    },
};