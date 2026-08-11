import { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import {
    History,
    PlayCircle,
} from "lucide-react";
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
import { BugSubmissionHistory } from "@/components/workspace/BugSubmissionHistory";

export default function WorkspacePage() {
    const { state } = useLocation();

    const [bottomPanelTab, setBottomPanelTab] =
        useState<"execution" | "history">(
            "execution",
        );

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

                            <div className="flex h-80 flex-col border-t border-white/10 bg-[#090909]">

                                {/* Tabs */}
                                <div className="flex shrink-0 items-center border-b border-white/10 px-4">

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBottomPanelTab("execution")
                                        }
                                        className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${bottomPanelTab === "execution"
                                            ? "border-orange-500 text-white"
                                            : "border-transparent text-zinc-500 hover:text-zinc-300"
                                            }`}
                                    >
                                        <PlayCircle size={15} />

                                        Execution Results
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setBottomPanelTab("history")
                                        }
                                        className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${bottomPanelTab === "history"
                                            ? "border-orange-500 text-white"
                                            : "border-transparent text-zinc-500 hover:text-zinc-300"
                                            }`}
                                    >
                                        <History size={15} />

                                        Submission History
                                    </button>

                                </div>

                                {/* Content */}
                                <div className="min-h-0 flex-1 overflow-hidden">

                                    {bottomPanelTab === "execution" ? (
                                        <ExecutionPanel
                                            result={executionResult}
                                            isExecuting={
                                                executeSubmission.isPending
                                            }
                                            isFocused={false}
                                            onToggleFocus={() =>
                                                setIsExecutionFocused(true)
                                            }
                                        />
                                    ) : (
                                        <div className="h-full overflow-auto p-5">
                                            <BugSubmissionHistory
                                                bugId={bug.id}
                                            />
                                        </div>
                                    )}

                                </div>

                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}