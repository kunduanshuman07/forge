import { useState } from "react";
import { ChevronDown, ChevronRight, Folder, File } from "lucide-react";

import type { FileTreeNode } from "@/types/file-tree.types";
import { useWorkspaceStore } from "@/stores/workspace.store";
import { useSelectedFileId } from "@/stores/workspace.selectors";

interface FileTreeNodeItemProps {
    node: FileTreeNode;
}

export function FileTreeNodeItem({
    node,
}: FileTreeNodeItemProps) {
    const [expanded, setExpanded] = useState(true);
    const selectedFileId = useSelectedFileId();
    const openFile = useWorkspaceStore(
        (state) => state.openFile
    );

    if (node.type === "file") {
        return (
            <button
                onClick={() => node.file && openFile(node.file.id)}
                className={`flex w-full items-center gap-2 rounded-md px-2 py-1 text-left transition-colors ${selectedFileId === node.file?.id
                    ? "bg-zinc-800 text-white"
                    : "hover:bg-white/5"
                    }`}
            >
                <File size={16} />

                <span>{node.name}</span>
            </button>
        );
    }

    return (
        <div>
            <button
                onClick={() => setExpanded(!expanded)}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1 hover:bg-white/5"
            >
                {expanded ? (
                    <ChevronDown size={16} />
                ) : (
                    <ChevronRight size={16} />
                )}

                <Folder size={16} />

                <span>{node.name}</span>
            </button>

            {expanded && (
                <div className="ml-5 mt-1">
                    {node.children.map((child) => (
                        <FileTreeNodeItem
                            key={child.id}
                            node={child}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}