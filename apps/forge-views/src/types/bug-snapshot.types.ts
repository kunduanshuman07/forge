// src/types/bug-snapshot.types.ts

export type Runtime =
    | "NODE"
    | "PYTHON"
    | "JAVA"
    | "GO";

export interface CreateBugSnapshotDto {
    runtime: Runtime;

    dockerImage?: string;
    nodeVersion?: string;

    installCommand?: string;
    buildCommand?: string;
    startCommand?: string;
    testCommand?: string;

    entryPoint?: string;

    memoryLimitMb?: number;
    cpuLimit?: number;
}

export interface BugSnapshot {
    id: string;
    bugId: string;
    version: number;

    runtime: Runtime;

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
}