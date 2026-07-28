
import type { SubmissionFile } from "@/types/submission-file.types";
import { EditorTab } from "./EditorTab";
import { useMemo } from "react";
import { useOpenFileIds, useWorkspaceFiles } from "@/stores/workspace.selectors";

export function EditorTabs() {
    const files = useWorkspaceFiles();

    const openFileIds = useOpenFileIds();
    const openFiles = useMemo(() => {
        return openFileIds
            .map((id) =>
                files.find((file) => file.id === id)
            )
            .filter(
                (file): file is SubmissionFile =>
                    file !== undefined
            );
    }, [files, openFileIds]);

    return (
        <div className="flex h-10 items-center overflow-x-auto border-b border-white/10 bg-[#181818]">
            {openFiles.map((file) => (
                <EditorTab
                    key={file.id}
                    file={file}
                />
            ))}
        </div>
    );
}