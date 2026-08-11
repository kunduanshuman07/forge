import { useSubmission } from "@/hooks/submissions/useUpdateSubmissionFile";
import {
    ArrowLeft,
    Code2,
    Loader2,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

export default function SubmissionDetailsPage() {
    const navigate = useNavigate();

    const { submissionId } = useParams();

    const {
        data,
        isLoading,
        isError,
    } = useSubmission(submissionId);

    if (isLoading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <Loader2
                    size={24}
                    className="animate-spin text-orange-500"
                />
            </div>
        );
    }

    if (isError || !data) {
        return (
            <section className="px-8 py-12">
                <div className="mx-auto max-w-7xl">

                    <button
                        onClick={() =>
                            navigate("/submissions")
                        }
                        className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to submissions
                    </button>

                    <h1 className="text-2xl font-bold text-white">
                        Submission not found
                    </h1>

                </div>
            </section>
        );
    }

    const {
        bug,
        files,
    } = data;

    const submission = data;

    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Back */}
                <button
                    onClick={() =>
                        navigate("/submissions")
                    }
                    className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Submission History
                </button>

                {/* Header */}
                <div className="mb-10">

                    <p className="mb-2 text-sm uppercase tracking-widest text-orange-400">
                        Submission
                    </p>

                    <h1 className="text-4xl font-bold text-white">
                        {bug.title}
                    </h1>

                    <p className="mt-3 max-w-4xl text-zinc-500">
                        {bug.description}
                    </p>

                </div>

                {/* Stats */}
                <div className="grid gap-4 md:grid-cols-4">

                    {/* Status */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Status
                        </p>

                        <p
                            className={`mt-2 font-semibold ${submission.status === "PASSED"
                                    ? "text-emerald-400"
                                    : submission.status === "FAILED" ||
                                        submission.status === "ERROR"
                                        ? "text-red-400"
                                        : "text-yellow-400"
                                }`}
                        >
                            {submission.status}
                        </p>

                    </div>

                    {/* Score */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Score
                        </p>

                        <p className="mt-2 font-semibold text-white">
                            {submission.score}
                            {" / "}
                            {bug.points}
                        </p>

                    </div>

                    {/* Execution Time */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Execution Time
                        </p>

                        <p className="mt-2 font-semibold text-white">
                            {submission.executionTimeMs !== null
                                ? `${(
                                    submission.executionTimeMs /
                                    1000
                                ).toFixed(1)}s`
                                : "—"}
                        </p>

                    </div>

                    {/* Files */}
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">

                        <p className="text-xs uppercase tracking-wider text-zinc-600">
                            Files
                        </p>

                        <p className="mt-2 font-semibold text-white">
                            {files.length}
                        </p>

                    </div>

                </div>

                {/* Open Workspace */}
                <div className="mt-8 flex justify-end">

                    <button
                        onClick={() =>
                            navigate("/workspace", {
                                state: {
                                    bug,
                                    submission,
                                    submissionFiles: files,
                                },
                            })
                        }
                        className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-3 text-sm font-semibold text-black transition hover:bg-orange-400"
                    >
                        <Code2 size={17} />
                        Open Workspace
                    </button>

                </div>

            </div>
        </section>
    );
}