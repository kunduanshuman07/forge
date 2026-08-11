import { Loader2 } from "lucide-react";

import { useCurrentUser } from "@/hooks/auth/useCurrentUser";

import { SubmissionCard } from "@/components/submissions/SubmissionCard";
import { useSubmissions } from "@/hooks/submissions/useUpdateSubmissionFile";
import { useNavigate } from "react-router-dom";

export default function SubmissionsPage() {
    const navigate = useNavigate();
    const { data: user, isLoading: isUserLoading } =
        useCurrentUser();

    const {
        data,
        isLoading: isSubmissionsLoading,
        isError,
    } = useSubmissions(user?.userId);

    if (isUserLoading || isSubmissionsLoading) {
        return (
            <section className="px-8 py-12">
                <div className="mx-auto flex max-w-7xl items-center justify-center py-32">
                    <Loader2
                        size={24}
                        className="animate-spin text-orange-500"
                    />
                </div>
            </section>
        );
    }

    if (isError) {
        return (
            <section className="px-8 py-12">
                <div className="mx-auto max-w-7xl">
                    <h1 className="text-3xl font-bold text-white">
                        Submission History
                    </h1>

                    <p className="mt-3 text-zinc-500">
                        Failed to load your submissions.
                    </p>
                </div>
            </section>
        );
    }

    const submissions = data?.data ?? [];

    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}
                <div className="mb-10">
                    <div className="flex items-end justify-between">

                        <div>
                            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-orange-400">
                                Forge
                            </p>

                            <h1 className="text-4xl font-bold tracking-tight text-white">
                                Submission History
                            </h1>

                            <p className="mt-3 max-w-2xl text-zinc-500">
                                Track your debugging attempts,
                                scores, and execution results.
                            </p>
                        </div>

                        <div className="hidden rounded-xl border border-white/10 bg-white/[0.03] px-5 py-3 sm:block">
                            <p className="text-xs uppercase tracking-wider text-zinc-600">
                                Total Attempts
                            </p>

                            <p className="mt-1 text-xl font-semibold text-white">
                                {submissions.length}
                            </p>
                        </div>

                    </div>
                </div>

                {/* Empty */}
                {submissions.length === 0 && (
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] py-20 text-center">
                        <h2 className="text-lg font-semibold text-white">
                            No submissions yet
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Solve a bug and your attempts will
                            appear here.
                        </p>
                    </div>
                )}

                {/* Submission List */}
                {submissions.length > 0 && (
                    <div className="space-y-4">
                        {submissions.map((submission: any) => (
                            <SubmissionCard
                                key={submission.id}
                                submission={submission}
                                onClick={() =>
                                    navigate(`/submissions/${submission.id}`)
                                }
                            />
                        ))}
                    </div>
                )}

            </div>
        </section>
    );
}