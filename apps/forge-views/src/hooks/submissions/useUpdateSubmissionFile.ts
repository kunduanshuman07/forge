import { useMutation } from "@tanstack/react-query";

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