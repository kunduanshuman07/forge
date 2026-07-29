import { useMutation } from "@tanstack/react-query";

import { executionService } from "@/services/execution.service";

export function useExecuteSubmission() {
    return useMutation({
        mutationFn: (submissionId: string) =>
            executionService.executeSubmission(
                submissionId,
            ),
    });
}