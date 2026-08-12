
import { projectApi } from "@/lib/api";
import type {
    CreateTestCasePayload,
    TestCase,
} from "@/types/test-case.types";

export const testCaseService = {

    async create(
        snapshotId: string,
        payload: CreateTestCasePayload,
    ): Promise<TestCase> {

        const response = await projectApi.post(
            `/forge-bug-engine/test-cases/${snapshotId}`,
            payload,
        );

        return response.data;
    },

};