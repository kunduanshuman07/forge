export type BugDifficulty =
    | "BEGINNER"
    | "INTERMEDIATE"
    | "ADVANCED";

export interface Bug {
    id: string;
    projectId: string;

    slug: string;

    title: string;
    description: string;

    learningObjectives: string | null;
    expectedOutcome: string | null;

    difficulty: BugDifficulty;

    estimatedMinutes: number;

    points: number;

    displayOrder: number;

    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: Pagination;
}