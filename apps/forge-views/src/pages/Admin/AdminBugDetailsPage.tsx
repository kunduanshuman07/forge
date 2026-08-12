import {
    ArrowLeft,
    AsteriskSquare,
    Bug,
    CheckCircle2,
    Clock3,
    FlaskConical,
    FolderPlus,
    GitBranch,
    Plus,
    Settings2,
    Terminal,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useBug } from "../../hooks/bugs/useBugs";
import { useBugSnapshots } from "@/hooks/bugs/useBugsnapshots";
import { Button } from "@base-ui/react";

type BugTab = "overview" | "snapshots";

export default function AdminBugDetailsPage() {
    const navigate = useNavigate();
    const { bugId } = useParams();

    const [activeTab, setActiveTab] =
        useState<BugTab>("overview");

    const {
        data: bug,
        isLoading: isBugLoading,
        isError: isBugError,
    } = useBug(bugId);

    const {
        data: snapshots,
        isLoading: isSnapshotsLoading,
        isError: isSnapshotsError,
        refetch: refetchSnapshots,
    } = useBugSnapshots(bugId);

    if (isBugLoading) {
        return <BugDetailsSkeleton />;
    }

    if (isBugError || !bug) {
        return (
            <section className="px-8 py-12">
                <div className="mx-auto max-w-7xl">

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/projects")
                        }
                        className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to Projects
                    </button>

                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-10 text-center">
                        <h1 className="text-xl font-semibold text-white">
                            Bug not found
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            This bug could not be loaded.
                        </p>
                    </div>

                </div>
            </section>
        );
    }

    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Breadcrumb */}

                <button
                    type="button"
                    onClick={() =>
                        navigate(
                            `/admin/projects/${bug.projectId}`,
                        )
                    }
                    className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Project
                </button>

                {/* Bug Header */}

                <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

                    <div className="p-7">

                        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

                            <div className="flex gap-5">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                                    <Bug size={25} />
                                </div>

                                <div>

                                    <div className="flex flex-wrap items-center gap-3">

                                        <h1 className="text-3xl font-bold text-white">
                                            {bug.title}
                                        </h1>

                                        <StatusBadge
                                            published={
                                                bug.isPublished
                                            }
                                        />

                                        <DifficultyBadge
                                            difficulty={
                                                bug.difficulty
                                            }
                                        />

                                    </div>

                                    <p className="mt-2 text-sm text-zinc-600">
                                        {bug.slug}
                                    </p>

                                    <p className="mt-4 max-w-4xl text-sm leading-6 text-zinc-400">
                                        {bug.description}
                                    </p>

                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-orange-500/30 hover:text-orange-400"
                            >
                                <Settings2 size={16} />
                                Edit Bug
                            </button>

                        </div>
                    </div>

                    {/* Bug metadata */}

                    <div className="grid divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">

                        <Meta
                            icon={GitBranch}
                            label="Project"
                            value={bug.projectId}
                        />

                        <Meta
                            icon={Clock3}
                            label="Estimated Time"
                            value={`${bug.estimatedMinutes} min`}
                        />

                        <Meta
                            icon={CheckCircle2}
                            label="Points"
                            value={bug.points}
                        />

                        <Meta
                            icon={Terminal}
                            label="Order"
                            value={bug.displayOrder}
                        />

                    </div>
                </div>

                {/* Tabs */}

                <div className="mb-6 border-b border-white/10">

                    <div className="flex items-center gap-2">

                        <TabButton
                            active={
                                activeTab === "overview"
                            }
                            onClick={() =>
                                setActiveTab("overview")
                            }
                        >
                            <Bug size={16} />
                            Overview
                        </TabButton>

                        <TabButton
                            active={
                                activeTab === "snapshots"
                            }
                            onClick={() =>
                                setActiveTab("snapshots")
                            }
                        >
                            <GitBranch size={16} />
                            Snapshots

                            {!isSnapshotsLoading &&
                                snapshots && (
                                    <span className="ml-1 rounded-full bg-white/5 px-2 py-0.5 text-[10px]">
                                        {snapshots.length}
                                    </span>
                                )}
                        </TabButton>

                    </div>

                </div>

                {/* Overview */}

                {activeTab === "overview" && (
                    <BugOverview bug={bug} />
                )}

                {/* Snapshots */}

                {activeTab === "snapshots" && (
                    <SnapshotSection
                        projectId={bug.projectId}
                        bugId={bug.id}
                        snapshots={snapshots}
                        isLoading={isSnapshotsLoading}
                        isError={isSnapshotsError}
                        onRetry={() =>
                            refetchSnapshots()
                        }
                        onCreate={() =>
                            navigate(
                                `/admin/projects/${bug.projectId}/bugs/${bug.id}/snapshots/new`,
                            )
                        }
                    />
                )}

            </div>
        </section>
    );
}

function StatusBadge({
    published,
}: {
    published: boolean;
}) {
    return (
        <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${published
                ? "bg-emerald-500/10 text-emerald-400"
                : "bg-zinc-500/10 text-zinc-500"
                }`}
        >
            {published ? "Published" : "Draft"}
        </span>
    );
}

function DifficultyBadge({
    difficulty,
}: {
    difficulty: string;
}) {
    return (
        <span className="rounded-full bg-orange-500/10 px-3 py-1 text-xs font-medium text-orange-400">
            {difficulty}
        </span>
    );
}

function Meta({
    icon: Icon,
    label,
    value,
}: {
    icon: React.ComponentType<{
        size?: number;
        className?: string;
    }>;
    label: string;
    value: string | number;
}) {
    return (
        <div className="flex items-center gap-3 p-5">

            <Icon
                size={17}
                className="text-zinc-600"
            />

            <div>
                <p className="text-[10px] uppercase tracking-wider text-zinc-600">
                    {label}
                </p>

                <p className="mt-1 truncate text-sm font-medium text-zinc-300">
                    {value}
                </p>
            </div>

        </div>
    );
}

function TabButton({
    active,
    onClick,
    children,
}: {
    active: boolean;
    onClick: () => void;
    children: React.ReactNode;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition ${active
                ? "border-orange-500 text-orange-400"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
                }`}
        >
            {children}
        </button>
    );
}

function BugOverview({
    bug,
}: {
    bug: any;
}) {
    return (
        <div className="grid gap-5 lg:grid-cols-2">

            {/* Description */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <div className="mb-5 flex items-center gap-3">
                    <Bug
                        size={18}
                        className="text-orange-400"
                    />

                    <h2 className="font-semibold text-white">
                        Challenge Description
                    </h2>
                </div>

                <p className="text-sm leading-7 text-zinc-400">
                    {bug.description}
                </p>

            </div>

            {/* Learning */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                <div className="mb-5 flex items-center gap-3">
                    <FlaskConical
                        size={18}
                        className="text-orange-400"
                    />

                    <h2 className="font-semibold text-white">
                        Learning Objectives
                    </h2>
                </div>

                {bug.learningObjectives ? (
                    <p className="text-sm leading-7 text-zinc-400">
                        {bug.learningObjectives}
                    </p>
                ) : (
                    <p className="text-sm text-zinc-600">
                        No learning objectives configured.
                    </p>
                )}

            </div>

            {/* Expected outcome */}

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">

                <div className="mb-5 flex items-center gap-3">
                    <CheckCircle2
                        size={18}
                        className="text-orange-400"
                    />

                    <h2 className="font-semibold text-white">
                        Expected Outcome
                    </h2>
                </div>

                {bug.expectedOutcome ? (
                    <p className="text-sm leading-7 text-zinc-400">
                        {bug.expectedOutcome}
                    </p>
                ) : (
                    <p className="text-sm text-zinc-600">
                        No expected outcome configured.
                    </p>
                )}

            </div>

        </div>
    );
}

function SnapshotSection({
    projectId,
    bugId,
    snapshots,
    isLoading,
    isError,
    onRetry,
    onCreate,
}: {
    projectId: string;
    bugId: string;
    snapshots: any[] | undefined;
    isLoading: boolean;
    isError: boolean;
    onRetry: () => void;
    onCreate: () => void;
}) {
    const navigate = useNavigate();
    return (
        <div>

            <div className="mb-5 flex items-center justify-between">

                <div>
                    <h2 className="text-xl font-semibold text-white">
                        Bug Snapshots
                    </h2>

                    <p className="mt-1 text-sm text-zinc-600">
                        Manage the codebase versions used when
                        users start this bug.
                    </p>
                </div>

                <button
                    type="button"
                    onClick={onCreate}
                    className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
                >
                    <Plus size={17} />
                    Create Snapshot
                </button>

            </div>

            {isLoading && (
                <div className="space-y-3">
                    {[1, 2].map((item) => (
                        <div
                            key={item}
                            className="h-32 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
                        />
                    ))}
                </div>
            )}

            {isError && !isLoading && (
                <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">

                    <p className="font-medium text-white">
                        Failed to load snapshots
                    </p>

                    <button
                        type="button"
                        onClick={onRetry}
                        className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 hover:bg-white/5 hover:text-white"
                    >
                        Try again
                    </button>

                </div>
            )}

            {!isLoading &&
                !isError &&
                !snapshots?.length && (
                    <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">

                        <GitBranch
                            size={32}
                            className="mx-auto text-zinc-600"
                        />

                        <h3 className="mt-4 font-semibold text-white">
                            No snapshots yet
                        </h3>

                        <p className="mt-2 text-sm text-zinc-600">
                            Create a snapshot to define the
                            initial workspace for this bug.
                        </p>

                        <button
                            type="button"
                            onClick={onCreate}
                            className="mt-5 inline-flex items-center gap-2 rounded-lg bg-orange-500 px-4 py-2 text-sm font-semibold text-black"
                        >
                            <Plus size={16} />
                            Create Snapshot
                        </button>

                    </div>
                )}

            {!isLoading &&
                !isError &&
                snapshots &&
                snapshots.length > 0 && (
                    <div className="space-y-3">

                        {snapshots.map((snapshot) => (
                            <div
                                key={snapshot.id}
                                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-500/20 hover:bg-white/[0.05]"
                            >
                                <div className="flex items-center gap-5">

                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-500 group-hover:text-orange-400">
                                        <GitBranch
                                            size={19}
                                        />
                                    </div>

                                    <div className="min-w-0 flex-1">

                                        <div className="flex flex-wrap items-center gap-3">

                                            <h3 className="font-semibold text-white">
                                                {snapshot.name ??
                                                    snapshot.version ??
                                                    "Snapshot"}
                                            </h3>

                                            {snapshot.isActive && (
                                                <span className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-400">
                                                    <CheckCircle2
                                                        size={12}
                                                    />
                                                    Active
                                                </span>
                                            )}

                                        </div>

                                        {snapshot.description && (
                                            <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                                                {
                                                    snapshot.description
                                                }
                                            </p>
                                        )}

                                        <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600">
                                            <span>
                                                ID:{" "}
                                                {snapshot.id}
                                            </span>
                                        </div>

                                    </div>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            window.location.assign(
                                                `/admin/bugs/${bugId}/snapshots/${snapshot.id}`,
                                            )
                                        }
                                        className="shrink-0 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-orange-400"
                                    >
                                        Manage
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/admin/projects/${projectId}/bugs/${bugId}/snapshots/${snapshot.id}/files/new`,
                                            )
                                        }
                                        className="flex shrink-0 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-orange-400 mr-2"
                                    >
                                        <FolderPlus size={20} className="mr-2"/>
                                        Create Snapshot Files
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() =>
                                            navigate(
                                                `/admin/projects/${projectId}/bugs/${bugId}/snapshots/${snapshot.id}/test-cases/new`,
                                            )
                                        }
                                        className="flex shrink-0 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-orange-400 mr-2"
                                    >
                                        <AsteriskSquare size={20} className="mr-2"/>
                                        Create Test Cases
                                    </button>

                                </div>
                            </div>
                        ))}

                    </div>
                )}

        </div>
    );
}

function BugDetailsSkeleton() {
    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-7xl">

                <div className="mb-8 h-5 w-32 animate-pulse rounded bg-white/5" />

                <div className="overflow-hidden rounded-2xl border border-white/10">

                    <div className="h-48 animate-pulse bg-white/[0.03]" />

                    <div className="grid grid-cols-4 divide-x divide-white/10">
                        {[1, 2, 3, 4].map((item) => (
                            <div
                                key={item}
                                className="h-20 animate-pulse bg-white/[0.02]"
                            />
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
}