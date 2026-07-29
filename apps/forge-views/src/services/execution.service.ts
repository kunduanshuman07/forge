import { executionApi } from "@/lib/api";

import type { ExecutionResponse } from "@/types/execution.types";

class ExecutionService {
    async executeSubmission(
        submissionId: string,
    ): Promise<ExecutionResponse> {
        const response =
            await executionApi.post<{
                data: ExecutionResponse;
            }>(
                `/forge-execution-engine/executions/${submissionId}/execute`,
            );

        return response.data.data;
    }
}

export const executionService =
    new ExecutionService();