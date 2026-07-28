import type { SubmissionFile } from "./submission-file.types";

export interface FileTreeNode {
    id: string;
    name: string;
    path: string;
    type: "file" | "folder";

    children: FileTreeNode[];

    file?: SubmissionFile;
}