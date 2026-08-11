import { useMutation, useQuery } from "@tanstack/react-query";

import { submissionService } from "@/services/submission.service";

export function useUpdateSubmissionFile() {
    return useMutation({
        mutationFn: ({
            submissionId,
            fileId,
            content,
        }: {
            submissionId: string;
            fileId: string;
            content: string;
        }) =>
            submissionService.updateSubmissionFile(
                submissionId,
                fileId,
                content,
            ),
    });
}

export function useSubmissions(
    userId?: string,
    bugId?: string,
) {
    return useQuery({
        queryKey: [
            "submissions",
            userId,
            bugId,
        ],

        queryFn: async () => {
            if (!userId) {
                throw new Error(
                    "User ID is required",
                );
            }

            const response =
                await submissionService.getSubmissions(
                    userId,
                    bugId,
                );

            return response.data;
        },

        enabled: !!userId,

        retry: false,
    });
}

export function useSubmission(
    submissionId?: string,
) {
    return useQuery({
        queryKey: [
            "submission",
            submissionId,
        ],

        queryFn: async () => {
            if (!submissionId) {
                throw new Error(
                    "Submission ID is required",
                );
            }

            const response =
                await submissionService.getSubmission(
                    submissionId,
                );

            return response.data;
        },

        enabled: !!submissionId,

        retry: false,
    });
}