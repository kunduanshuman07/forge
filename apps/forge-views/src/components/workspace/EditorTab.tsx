import { X } from "lucide-react";

import type { SubmissionFile } from "@/types/submission-file.types";

import { useWorkspaceStore } from "@/stores/workspace.store";
import { useDirtyFileIds, useSelectedFileId } from "@/stores/workspace.selectors";

interface EditorTabProps {
    file: SubmissionFile;
}

export function EditorTab({
    file,
}: EditorTabProps) {
    const selectedFileId = useSelectedFileId();

    const selectFile = useWorkspaceStore(
        (state) => state.selectFile
    );

    const closeFile = useWorkspaceStore(
        (state) => state.closeFile
    );

    const active = selectedFileId === file.id;

    const dirtyFileIds = useDirtyFileIds();

    const dirty = dirtyFileIds.includes(file.id);

    return (
        <div
            className={`group flex h-full min-w-[170px] items-center justify-between border-r border-white/10 px-4 transition-colors ${active
                ? "bg-[#1e1e1e]"
                : "bg-[#181818] hover:bg-[#222]"
                }`}
        >
            <button
                onClick={() => selectFile(file.id)}
                className="flex flex-1 items-center text-left"
            >
                <div className="flex items-center gap-2">
                    {dirty && (
                        <div className="h-2 w-2 rounded-full bg-blue-400" />
                    )}

                    <span className="truncate text-sm">
                        {file.name}
                    </span>
                </div>
            </button>

            <button
                onClick={() => closeFile(file.id)}
                className="ml-3 rounded p-1 opacity-0 transition-opacity hover:bg-white/10 group-hover:opacity-100"
            >
                <X size={14} />
            </button>
        </div>
    );
}