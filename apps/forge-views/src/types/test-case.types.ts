export type TestCaseType =
    | "UNIT"
    | "INTEGRATION"
    | "E2E";

export interface CreateTestCasePayload {
    name: string;
    description?: string;
    type: TestCaseType;
    command: string;
    expectedOutput?: string;
    timeoutSeconds?: number;
    points?: number;
    displayOrder: number;
}

export interface TestCase {
    id: string;
    snapshotId: string;

    name: string;
    description?: string | null;

    type: TestCaseType;

    command: string;
    expectedOutput?: string | null;

    timeoutSeconds: number;
    points: number;

    displayOrder: number;

    createdAt: string;
}