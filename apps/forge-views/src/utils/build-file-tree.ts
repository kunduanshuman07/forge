import type { SubmissionFile } from "@/types/submission-file.types";
import type { FileTreeNode } from "@/types/file-tree.types";

export function buildFileTree(
    files: SubmissionFile[]
): FileTreeNode[] {
    const root: FileTreeNode[] = [];

    for (const file of files) {
        const parts = file.path.split("/");

        let currentLevel = root;

        let currentPath = "";

        for (let i = 0; i < parts.length; i++) {
            const part = parts[i];

            currentPath = currentPath
                ? `${currentPath}/${part}`
                : part;

            const isFile = i === parts.length - 1;

            let node = currentLevel.find(
                (item) =>
                    item.name === part &&
                    item.type === (isFile ? "file" : "folder")
            );

            if (!node) {
                node = {
                    id: isFile ? file.id : currentPath,
                    name: part,
                    path: currentPath,
                    type: isFile ? "file" : "folder",
                    children: [],
                    file: isFile ? file : undefined,
                };

                currentLevel.push(node);
            }

            currentLevel = node.children;
        }
    }

    return root;
}