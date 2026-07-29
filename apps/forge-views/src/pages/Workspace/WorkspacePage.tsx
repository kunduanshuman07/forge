import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";

import { WorkspaceHeader } from "@/components/workspace/WorkspaceHeader";
import { FileExplorer } from "@/components/workspace/FileExplorer";
import { CodeEditor } from "@/components/workspace/CodeEditor";
import { EditorTabs } from "@/components/workspace/EditorTabs";
import { ExecutionPanel } from "@/components/workspace/ExecutionPanel";

import { useWorkspaceStore } from "@/stores/workspace.store";
import { useWorkspaceShortcuts } from "@/hooks/useWorkspaceShortcuts";

import { useUpdateSubmissionFile } from "@/hooks/submissions/useUpdateSubmissionFile";
import { useExecuteSubmission } from "@/hooks/execution/useExecutionSubmission";

import type { ExecutionResponse } from "@/types/execution.types";

export default function WorkspacePage() {
    const { state } = useLocation();

    const executeSubmission = useExecuteSubmission();

    const [isSaving, setIsSaving] = useState(false);
    const [isExecutionFocused, setIsExecutionFocused] =
        useState(false);

    const setFiles = useWorkspaceStore(
        (state) => state.setFiles,
    );

    const openFile = useWorkspaceStore(
        (state) => state.openFile,
    );

    const files = useWorkspaceStore(
        (state) => state.files,
    );

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
        submission: initialSubmission,
        submissionFiles,
    } = state;

    const [submission, setSubmission] =
        useState(initialSubmission);

    const [
        executionResult,
        setExecutionResult,
    ] = useState<ExecutionResponse>();

    useEffect(() => {
        setFiles(submissionFiles);

        const firstEditable =
            submissionFiles.find(
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
            console.error(
                "Failed to save workspace:",
                error,
            );
        } finally {
            setIsSaving(false);
        }
    };

    useWorkspaceShortcuts(handleSave);

    const handleRun = async () => {
        if (executeSubmission.isPending) {
            return;
        }

        try {
            await handleSave();

            const execution =
                await executeSubmission.mutateAsync(
                    submission.id,
                );

            setSubmission(execution.submission);
            setExecutionResult(execution);

            // Automatically open execution panel after run
            setIsExecutionFocused(true);
        } catch (error) {
            console.error(
                "Execution failed:",
                error,
            );
        }
    };

    return (
        <div className="flex h-[calc(100vh-80px)] flex-col">
            <WorkspaceHeader
                bug={bug}
                submission={submission}
                isSaving={isSaving}
                isExecuting={executeSubmission.isPending}
                onSave={handleSave}
                onRun={handleRun}
            />

            <div className="flex flex-1 overflow-hidden">
                {isExecutionFocused ? (
                    <div className="flex h-full w-full flex-col overflow-hidden">
                        <ExecutionPanel
                            result={executionResult}
                            isExecuting={executeSubmission.isPending}
                            isFocused
                            onToggleFocus={() =>
                                setIsExecutionFocused(false)
                            }
                        />
                    </div>
                ) : (
                    <>
                        <FileExplorer />

                        <div className="flex flex-1 flex-col overflow-hidden">
                            <EditorTabs />

                            <CodeEditor />

                            <ExecutionPanel
                                result={executionResult}
                                isExecuting={
                                    executeSubmission.isPending
                                }
                                isFocused={false}
                                onToggleFocus={() =>
                                    setIsExecutionFocused(
                                        true,
                                    )
                                }
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}