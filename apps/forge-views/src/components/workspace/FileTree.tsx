import type { FileTreeNode } from "@/types/file-tree.types";
import { FileTreeNodeItem } from "./FileTreeNodeItem";

interface FileTreeProps {
    nodes: FileTreeNode[];
}

export function FileTree({
    nodes,
}: FileTreeProps) {
    return (
        <div className="space-y-1">
            {nodes.map((node) => (
                <FileTreeNodeItem
                    key={node.id}
                    node={node}
                />
            ))}
        </div>
    );
}