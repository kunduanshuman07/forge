import type { SubmissionFile } from "./submission-file.types";

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

export interface SubmissionHistoryBug {
    id: string;
    projectId: string;
    slug: string;
    title: string;
    description: string;

    learningObjectives: string | null;
    expectedOutcome: string | null;

    difficulty: string;
    estimatedMinutes: number;
    points: number;

    displayOrder: number;
    isPublished: boolean;

    createdAt: string;
    updatedAt: string;
}

export interface SubmissionHistorySnapshot {
    id: string;
    bugId: string;

    version: number;

    runtime: string;
    dockerImage: string | null;
    nodeVersion: string;

    installCommand: string | null;
    buildCommand: string | null;
    startCommand: string | null;
    testCommand: string | null;
    entryPoint: string | null;

    memoryLimitMb: number;
    cpuLimit: number;

    isLatest: boolean;

    createdAt: string;
}

export interface SubmissionHistoryItem extends Submission {
    bug: SubmissionHistoryBug;
    snapshot: SubmissionHistorySnapshot;
}

export interface SubmissionPagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface SubmissionHistoryResponse {
    data: SubmissionHistoryItem[];
    pagination: SubmissionPagination;
}

export interface SubmissionDetails
    extends Submission {
    bug: {
        id: string;
        projectId: string;
        slug: string;
        title: string;
        description: string;
        learningObjectives: string | null;
        expectedOutcome: string | null;
        difficulty: string;
        estimatedMinutes: number;
        points: number;
        displayOrder: number;
        isPublished: boolean;
        createdAt: string;
        updatedAt: string;
    };

    snapshot: {
        id: string;
        bugId: string;
        version: number;
        runtime: string;
        dockerImage: string | null;
        nodeVersion: string | null;
        installCommand: string | null;
        buildCommand: string | null;
        startCommand: string | null;
        testCommand: string | null;
        entryPoint: string | null;
        memoryLimitMb: number | null;
        cpuLimit: number | null;
        isLatest: boolean;
        createdAt: string;
    };

    files: SubmissionFile[];
}