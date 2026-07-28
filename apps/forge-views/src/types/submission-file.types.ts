export type SubmissionFileType =
    | "SOURCE"
    | "CONFIG"
    | "TEST";

export type SubmissionFileLanguage =
    | "TYPESCRIPT"
    | "JAVASCRIPT"
    | "JSON"
    | null;

export interface SubmissionFile {
    id: string;

    submissionId: string;

    path: string;
    name: string;
    extension: string;

    language: SubmissionFileLanguage;

    type: SubmissionFileType;

    content: string;

    size: number;

    isEditable: boolean;
    isHidden: boolean;

    displayOrder: number;

    createdAt: string;
}

export interface SubmissionFileResponse {
    data: SubmissionFile[];
}