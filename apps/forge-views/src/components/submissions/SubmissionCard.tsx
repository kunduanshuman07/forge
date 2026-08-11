import {
    CheckCircle2,
    XCircle,
    Clock3,
    ChevronRight,
} from "lucide-react";

import type { Submission } from "@/types/submission.types";

interface SubmissionCardProps {
    submission: Submission;
    onClick?: () => void;
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function formatExecutionTime(
    executionTimeMs: number | null,
) {
    if (executionTimeMs === null) {
        return "—";
    }

    if (executionTimeMs < 1000) {
        return `${executionTimeMs}ms`;
    }

    return `${(executionTimeMs / 1000).toFixed(1)}s`;
}

export function SubmissionCard({
    submission,
    onClick,
}: SubmissionCardProps) {
    const passed = submission.status === "PASSED";

    const failed =
        submission.status === "FAILED" ||
        submission.status === "ERROR";

    const pending =
        submission.status === "PENDING" ||
        submission.status === "RUNNING";

    return (
        <button
            type="button"
            onClick={onClick}
            className="group w-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition-all duration-200 hover:border-orange-500/30 hover:bg-white/[0.05]"
        >
            <div className="flex items-center justify-between gap-6">

                {/* Left */}
                <div className="min-w-0 flex-1">

                    <div className="mb-3 flex items-center gap-3">

                        {passed && (
                            <CheckCircle2
                                size={20}
                                className="shrink-0 text-emerald-400"
                            />
                        )}

                        {failed && (
                            <XCircle
                                size={20}
                                className="shrink-0 text-red-400"
                            />
                        )}

                        {pending && (
                            <Clock3
                                size={20}
                                className="shrink-0 text-yellow-400"
                            />
                        )}

                        <span className="truncate text-xs font-medium uppercase tracking-wider text-zinc-500">
                            Submission
                        </span>

                    </div>

                    <h3 className="truncate text-base font-semibold text-white">
                        Bug #{submission.bugId}
                    </h3>

                    <p className="mt-1 text-sm text-zinc-500">
                        Submitted on{" "}
                        {formatDate(submission.createdAt)}
                    </p>

                </div>

                {/* Right */}
                <div className="flex shrink-0 items-center gap-8">

                    {/* Status */}
                    <div className="text-right">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Status
                        </p>

                        <p
                            className={`mt-1 text-sm font-semibold ${passed
                                    ? "text-emerald-400"
                                    : failed
                                        ? "text-red-400"
                                        : "text-yellow-400"
                                }`}
                        >
                            {submission.status}
                        </p>

                    </div>

                    {/* Score */}
                    <div className="hidden text-right sm:block">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Score
                        </p>

                        <p className="mt-1 text-sm font-semibold text-white">
                            {submission.score}
                        </p>

                    </div>

                    {/* Execution */}
                    <div className="hidden text-right md:block">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Runtime
                        </p>

                        <p className="mt-1 text-sm font-semibold text-zinc-300">
                            {formatExecutionTime(
                                submission.executionTimeMs,
                            )}
                        </p>

                    </div>

                    <ChevronRight
                        size={18}
                        className="text-zinc-600 transition-transform group-hover:translate-x-1 group-hover:text-orange-400"
                    />

                </div>
            </div>
        </button>
    );
}