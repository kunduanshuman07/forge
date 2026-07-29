import { Play, Save } from "lucide-react";

import type { Bug } from "@/types/bug.types";
import type { Submission } from "@/types/submission.types";

interface WorkspaceHeaderProps {
    bug: Bug;
    submission: Submission;

    isSaving: boolean;
    isExecuting: boolean;

    onSave: () => void;
    onRun: () => void;
}

export function WorkspaceHeader({
    bug,
    submission,
    isSaving,
    isExecuting,
    onSave,
    onRun,
}: WorkspaceHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 bg-[#090909] px-8 py-4">
            <div>
                <h1 className="font-['Space_Grotesk'] text-2xl font-bold">
                    {bug.title}
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Investigation #{submission.id.slice(0, 8)} •{" "}
                    {submission.status}
                </p>
            </div>

            <div className="flex items-center gap-3">
                <button
                    onClick={onSave}
                    disabled={isSaving || isExecuting}
                    className="flex items-center gap-2 rounded-lg border border-white/10 bg-zinc-900 px-4 py-2 text-sm transition hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Save size={16} />

                    {isSaving ? "Saving..." : "Save"}
                </button>

                <button
                    onClick={onRun}
                    disabled={isExecuting}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <Play size={16} />

                    {isExecuting
                        ? "Running..."
                        : "Run"}
                </button>
            </div>
        </div>
    );
}