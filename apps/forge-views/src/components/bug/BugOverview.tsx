import {
    Award,
    Clock3,
    ClipboardList,
} from "lucide-react";

import type { Bug } from "@/types/bug.types";

import { Play } from "lucide-react";

interface BugOverviewProps {
    bug: Bug;
    onStartInvestigation: () => void;
    isInitializing: boolean;
}

export function BugOverview({
    bug,
    onStartInvestigation,
    isInitializing,
}: BugOverviewProps) {
    return (
        <section className="mb-16">
            <div className="p-8 pt-4 flex justify-end">

                <button
                    onClick={onStartInvestigation}
                    disabled={isInitializing}
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-70"
                >
                    <Play size={18} />

                    {isInitializing
                        ? "Initializing..."
                        : "Start Investigation"}
                </button>

            </div>
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl mx-4">

                {/* Header */}

                <div className="border-b border-white/10 p-10">

                    <p className="text-sm font-medium uppercase tracking-widest text-orange-400">
                        Production Bug
                    </p>

                    <h1 className="mt-3 font-['Space_Grotesk'] text-4xl font-bold">
                        {bug.title}
                    </h1>

                    <p className="mt-6 max-w-4xl leading-8 text-zinc-400">
                        {bug.description}
                    </p>

                </div>

                {/* Metadata */}

                <div className="grid gap-6 border-b border-white/10 p-10 md:grid-cols-3">

                    <div>

                        <p className="text-sm text-zinc-500">
                            Difficulty
                        </p>

                        <p className="mt-2 text-lg font-semibold">
                            {bug.difficulty}
                        </p>

                    </div>

                    <div className="flex items-start gap-3">

                        <Clock3
                            size={20}
                            className="mt-1 text-orange-400"
                        />

                        <div>

                            <p className="text-sm text-zinc-500">
                                Estimated Time
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                                {bug.estimatedMinutes} mins
                            </p>

                        </div>

                    </div>

                    <div className="flex items-start gap-3">

                        <Award
                            size={20}
                            className="mt-1 text-orange-400"
                        />

                        <div>

                            <p className="text-sm text-zinc-500">
                                Reward
                            </p>

                            <p className="mt-2 text-lg font-semibold">
                                {bug.points} XP
                            </p>

                        </div>

                    </div>

                </div>

                {/* Learning Objectives */}

                <div className="border-b border-white/10 p-10">

                    <div className="mb-5 flex items-center gap-3">

                        <ClipboardList
                            size={22}
                            className="text-orange-400"
                        />

                        <h2 className="font-['Space_Grotesk'] text-2xl font-bold">
                            Learning Objectives
                        </h2>

                    </div>

                    <p className="leading-8 text-zinc-400">

                        {bug.learningObjectives ??
                            "No learning objectives provided."}

                    </p>

                </div>

                {/* Expected Outcome */}

                <div className="p-10">

                    <div className="mb-5 flex items-center gap-3">

                        <ClipboardList
                            size={22}
                            className="text-orange-400"
                        />

                        <h2 className="font-['Space_Grotesk'] text-2xl font-bold">
                            Expected Outcome
                        </h2>

                    </div>

                    <p className="leading-8 text-zinc-400">

                        {bug.expectedOutcome ??
                            "No expected outcome provided."}

                    </p>

                </div>

            </div>

        </section>
    );
}