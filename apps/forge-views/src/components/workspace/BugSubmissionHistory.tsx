import {
    CheckCircle2,
    Clock3,
    XCircle,
} from "lucide-react";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";
import { useSubmissions } from "@/hooks/submissions/useUpdateSubmissionFile";

interface BugSubmissionHistoryProps {
    bugId: string;
}

interface BugSubmissionHistoryProps {
    bugId: string;
}

function formatDate(date: string) {
    return new Date(date).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
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

export function BugSubmissionHistory({
    bugId,
}: BugSubmissionHistoryProps) {
    const { data: user } = useCurrentUser();

    const {
        data: submissions,
        isLoading,
        isError,
    } = useSubmissions(
        user?.userId,
        bugId,
    );

    if (isLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-sm text-zinc-500">
                    Loading submission history...
                </div>
            </div>
        );
    }

    if (isError) {
        return (
            <div className="flex h-full items-center justify-center">
                <div className="text-sm text-red-400">
                    Failed to load submission history.
                </div>
            </div>
        );
    }

    const history = submissions?.data ?? [];

    if (history.length === 0) {
        return (
            <div className="flex h-full flex-col items-center justify-center text-center">
                <Clock3
                    size={40}
                    className="mb-4 text-zinc-600"
                />

                <h3 className="text-base font-semibold text-white">
                    No Previous Submissions
                </h3>

                <p className="mt-2 max-w-md text-sm text-zinc-500">
                    Your previous attempts for this bug
                    will appear here after you submit a
                    solution.
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-3">

            <div className="mb-5">
                <h3 className="text-sm font-semibold text-white">
                    Previous Submissions
                </h3>

                <p className="mt-1 text-xs text-zinc-500">
                    Historical attempts for this bug.
                    These submissions cannot be executed again.
                </p>
            </div>

            {history.map((submission: any) => {

                const passed =
                    submission.status === "PASSED";

                const failed =
                    submission.status === "FAILED" ||
                    submission.status === "ERROR";

                return (
                    <div
                        key={submission.id}
                        className="rounded-xl border border-white/10 bg-[#111111] p-4 transition hover:border-white/20"
                    >
                        <div className="flex items-center justify-between gap-4">

                            <div className="flex min-w-0 items-center gap-3">

                                {passed && (
                                    <CheckCircle2
                                        size={18}
                                        className="shrink-0 text-emerald-400"
                                    />
                                )}

                                {failed && (
                                    <XCircle
                                        size={18}
                                        className="shrink-0 text-red-400"
                                    />
                                )}

                                {!passed && !failed && (
                                    <Clock3
                                        size={18}
                                        className="shrink-0 text-yellow-400"
                                    />
                                )}

                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-white">
                                        Submission
                                    </p>

                                    <p className="mt-1 text-xs text-zinc-500">
                                        {formatDate(
                                            submission.createdAt,
                                        )}
                                    </p>
                                </div>

                            </div>

                            <div className="flex shrink-0 items-center gap-6">

                                <div className="text-right">
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                        Status
                                    </p>

                                    <p
                                        className={`mt-1 text-xs font-semibold ${passed
                                            ? "text-emerald-400"
                                            : failed
                                                ? "text-red-400"
                                                : "text-yellow-400"
                                            }`}
                                    >
                                        {submission.status}
                                    </p>
                                </div>

                                <div className="hidden text-right sm:block">
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                        Score
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-white">
                                        {submission.score}
                                    </p>
                                </div>

                                <div className="hidden text-right md:block">
                                    <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                                        Runtime
                                    </p>

                                    <p className="mt-1 text-xs font-semibold text-zinc-400">
                                        {formatExecutionTime(
                                            submission.executionTimeMs,
                                        )}
                                    </p>
                                </div>

                            </div>

                        </div>
                    </div>
                );
            })}
        </div>
    );
}