export type SubmissionStatus =
    | "PENDING"
    | "RUNNING"
    | "PASSED"
    | "FAILED"
    | "ERROR";

export interface Submission {
    id: string;

    userId: string;

    bugId: string;

    snapshotId: string;

    status: SubmissionStatus;

    score: number;

    executionTimeMs: number | null;
    memoryUsedMb: number | null;

    startedAt: string | null;
    completedAt: string | null;

    createdAt: string;
}

export interface CreateSubmissionResponse {
    message: string;

    submission: Submission;

    filesCopied: number;
}