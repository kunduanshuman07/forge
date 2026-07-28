import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { FileExplorer } from "@/components/workspace/FileExplorer";
import { CodeEditor } from "@/components/workspace/CodeEditor";
import { EditorTabs } from "@/components/workspace/EditorTabs";

import { useWorkspaceStore } from "@/stores/workspace.store";
import { useWorkspaceShortcuts } from "@/hooks/useWorkspaceShortcuts";

import { useUpdateSubmissionFile } from "@/hooks/submissions/useUpdateSubmissionFile";

export default function WorkspacePage() {
    const { state } = useLocation();

    const [isSaving, setIsSaving] = useState(false);

    const setFiles = useWorkspaceStore((state) => state.setFiles);
    const openFile = useWorkspaceStore((state) => state.openFile);

    const files = useWorkspaceStore((state) => state.files);

    const dirtyFileIds = useWorkspaceStore(
        (state) => state.dirtyFileIds,
    );

    const markFileSaved = useWorkspaceStore(
        (state) => state.markFileSaved,
    );

    const updateSubmissionFile =
        useUpdateSubmissionFile();

    if (!state) {
        return <Navigate to="/projects" replace />;
    }

    const {
        bug,
        submission,
        submissionFiles,
    } = state;

    useEffect(() => {
        setFiles(submissionFiles);

        const firstEditable = submissionFiles.find(
            (file: any) => file.isEditable,
        );

        if (firstEditable) {
            openFile(firstEditable.id);
        }
    }, [submissionFiles, setFiles, openFile]);

    const handleSave = async () => {
        if (isSaving) {
            return;
        }

        if (dirtyFileIds.length === 0) {
            return;
        }

        try {
            setIsSaving(true);

            const dirtyFiles = files.filter((file) =>
                dirtyFileIds.includes(file.id),
            );

            for (const file of dirtyFiles) {
                const updatedFile =
                    await updateSubmissionFile.mutateAsync({
                        submissionId: submission.id,
                        fileId: file.id,
                        content: file.content,
                    });

                markFileSaved(updatedFile);
            }

            console.log("Workspace saved.");
        } catch (error) {
            console.error("Failed to save workspace:", error);
        } finally {
            setIsSaving(false);
        }
    };

    useWorkspaceShortcuts(handleSave);

    return (
        <div className="flex h-[calc(100vh-80px)] flex-col">
            <WorkspaceHeader
                bug={bug}
                submission={submission}
            />

            <div className="flex flex-1 overflow-hidden">
                <FileExplorer />

                <div className="flex flex-1 flex-col overflow-hidden">
                    <EditorTabs />

                    <CodeEditor />
                </div>
            </div>
        </div>
    );
}