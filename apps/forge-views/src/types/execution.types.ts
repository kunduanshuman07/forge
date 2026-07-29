import type { Submission } from "./submission.types";

export interface CommandResult {
    exitCode: number;
    stdout: string;
    stderr: string;
    executionTimeMs: number;
}

export interface TestCaseExecution {
    testCase: {
        id: string;
        snapshotId: string;
        name: string;
        description: string;
        type: string;
        command: string;
        expectedOutput: string;
        timeoutSeconds: number;
        points: number;
        displayOrder: number;
        createdAt: string;
    };

    result: CommandResult;
}

export interface ExecutionResponse {
    submission: Submission;

    step: "INSTALL" | "BUILD" | "TEST";

    installResult?: CommandResult;

    buildResult?: CommandResult;

    testResults?: TestCaseExecution[];

    score?: number;

    executionTimeMs: number;
}