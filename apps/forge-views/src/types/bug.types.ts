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
    isPublished: boolean;
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

export interface BugSnapshot {
    id: string;

    bugId: string;

    name?: string | null;

    version?: string | null;

    description?: string | null;

    isActive?: boolean;

    createdAt: string;

    updatedAt: string;
}

export type Difficulty =
  | "BEGINNER"
  | "INTERMEDIATE"
  | "ADVANCED"
  | "EXPERT";

export interface CreateBugDto {
  title: string;
  slug: string;
  description?: string;
  learningObjectives?: string[];
  expectedOutcome?: string;
  difficulty: Difficulty;
  estimatedMinutes?: number;
  points?: number;
  displayOrder: number;
  isPublished?: boolean;
}