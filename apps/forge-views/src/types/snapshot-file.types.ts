export type Runtime =
    | "NODE"
    | "PYTHON"
    | "JAVA"
    | "GO";

export type ProgrammingLanguage =
    | "TYPESCRIPT"
    | "JAVASCRIPT"
    | "PYTHON"
    | "JAVA"
    | "GO"
    | "RUST";

export type FileType =
    | "SOURCE"
    | "CONFIG"
    | "TEST"
    | "DOCUMENTATION"
    | "ASSET"
    | "OTHER";

export interface CreateSnapshotFileDto {
    path: string;
    name: string;
    extension?: string;
    language?: ProgrammingLanguage;
    type: FileType;
    content: string;
    isEditable?: boolean;
    isHidden?: boolean;
    displayOrder: number;
}

export interface SnapshotFile extends CreateSnapshotFileDto {
    id: string;
    snapshotId: string;
    size: number | null;
    createdAt: string;
}