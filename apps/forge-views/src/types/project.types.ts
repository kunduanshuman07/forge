export interface Project {
    id: string;
    slug: string;

    title: string;
    shortDescription: string;
    description: string;

    category: string;

    language: "TYPESCRIPT" | "JAVASCRIPT";

    framework: string;

    difficulty: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

    estimatedHours: number;

    thumbnailUrl: string | null;
    bannerUrl: string | null;
    iconUrl: string | null;

    displayOrder: number;

    isPublished: boolean;

    createdAt: string;
    updatedAt: string;
}

export interface Pagination {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
}

export interface ProjectsResponse {
    data: Project[];
    pagination: Pagination;
}



export interface ProjectDetails extends Project {
    bugs: BugSummary[];
}

export interface BugSummary {
    id: string;

    title: string;

    difficulty: string;

    estimatedMinutes: number;

    status: "LOCKED" | "IN_PROGRESS" | "COMPLETED";
}