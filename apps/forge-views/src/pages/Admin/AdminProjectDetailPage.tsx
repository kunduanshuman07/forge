import {
    ArrowLeft,
    Bug,
    Clock3,
    Code2,
    FolderKanban,
    Plus,
    Settings2,
} from "lucide-react";

import { useNavigate, useParams } from "react-router-dom";

import { useProject } from "@/hooks/projects/useProject";
import { useBugs } from "@/hooks/bugs/useBugs";

export default function AdminProjectDetailsPage() {
    const navigate = useNavigate();
    const { projectId } = useParams();

    const {
        data: project,
        isLoading: isProjectLoading,
        isError: isProjectError,
    } = useProject(projectId!);


    const {
        data: bugsResponse,
        isLoading: isBugsLoading,
        isError: isBugsError,
        refetch: refetchBugs,
    } = useBugs(projectId!);

    const bugs = bugsResponse?.data ?? [];

    if (isProjectLoading) {
        return (
            <section className="px-8 py-12">
                <div className="mx-auto max-w-7xl space-y-4">
                    <div className="h-8 w-48 animate-pulse rounded bg-white/5" />
                    <div className="h-40 animate-pulse rounded-2xl bg-white/5" />
                    <div className="h-32 animate-pulse rounded-2xl bg-white/5" />
                </div>
            </section>
        );
    }

    if (isProjectError || !project) {
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
                            Project not found
                        </h1>

                        <p className="mt-2 text-sm text-zinc-500">
                            This project could not be loaded.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Back */}

                <button
                    type="button"
                    onClick={() =>
                        navigate("/admin/projects")
                    }
                    className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Projects
                </button>

                {/* Project Header */}

                <div className="mb-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">

                    <div className="border-b border-white/10 p-7">

                        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-start">

                            <div className="flex gap-5">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                                    <FolderKanban size={24} />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-3">

                                        <h1 className="text-3xl font-bold text-white">
                                            {project.title}
                                        </h1>

                                        <span
                                            className={`rounded-full px-3 py-1 text-xs font-medium ${project.isPublished
                                                ? "bg-emerald-500/10 text-emerald-400"
                                                : "bg-zinc-500/10 text-zinc-500"
                                                }`}
                                        >
                                            {project.isPublished
                                                ? "Published"
                                                : "Draft"}
                                        </span>

                                    </div>

                                    <p className="mt-2 text-sm text-zinc-500">
                                        {project.slug}
                                    </p>

                                    <p className="mt-4 max-w-3xl text-sm leading-6 text-zinc-400">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            <button
                                type="button"
                                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-sm text-zinc-300 transition hover:border-orange-500/30 hover:text-orange-400"
                            >
                                <Settings2 size={16} />
                                Edit Project
                            </button>

                        </div>
                    </div>

                    {/* Metadata */}

                    <div className="grid divide-y divide-white/10 md:grid-cols-4 md:divide-x md:divide-y-0">

                        <ProjectMeta
                            icon={Code2}
                            label="Language"
                            value={project.language}
                        />

                        <ProjectMeta
                            icon={Code2}
                            label="Framework"
                            value={project.framework}
                        />

                        <ProjectMeta
                            icon={FolderKanban}
                            label="Category"
                            value={project.category}
                        />

                        <ProjectMeta
                            icon={Clock3}
                            label="Estimated Time"
                            value={`${project.estimatedHours}h`}
                        />

                    </div>
                </div>

                {/* Bugs Header */}

                <div className="mb-5 flex items-center justify-between">

                    <div>
                        <div className="flex items-center gap-3">
                            <Bug
                                size={20}
                                className="text-orange-400"
                            />

                            <h2 className="text-xl font-semibold text-white">
                                Bugs
                            </h2>

                            {!isBugsLoading &&
                                bugs && (
                                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-zinc-500">
                                        {bugs.length}
                                    </span>
                                )}
                        </div>

                        <p className="mt-1 text-sm text-zinc-600">
                            Debugging challenges belonging to this
                            project.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate(
                                `/admin/projects/${project.id}/bugs/new`,
                            )
                        }
                        className="flex items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
                    >
                        <Plus size={17} />
                        Create Bug
                    </button>

                </div>

                {/* Bugs */}

                {isBugsLoading && (
                    <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
                            />
                        ))}
                    </div>
                )}

                {isBugsError && !isBugsLoading && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">

                        <p className="font-medium text-white">
                            Failed to load bugs
                        </p>

                        <button
                            type="button"
                            onClick={() => refetchBugs()}
                            className="mt-4 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                            Try again
                        </button>

                    </div>
                )}

                {!isBugsLoading &&
                    !isBugsError &&
                    !bugs?.length && (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">

                            <Bug
                                size={32}
                                className="mx-auto text-zinc-600"
                            />

                            <h3 className="mt-4 font-semibold text-white">
                                No bugs yet
                            </h3>

                            <p className="mt-2 text-sm text-zinc-600">
                                Create the first debugging challenge
                                for this project.
                            </p>

                        </div>
                    )}

                {!isBugsLoading &&
                    !isBugsError &&
                    bugs &&
                    bugs.length > 0 && (
                        <div className="space-y-3">

                            {bugs.map((bug) => (
                                <div
                                    key={bug.id}
                                    className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-500/20 hover:bg-white/[0.05]"
                                >
                                    <div className="flex items-center gap-5">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-500 transition group-hover:text-orange-400">
                                            <Bug size={19} />
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <div className="flex flex-wrap items-center gap-3">

                                                <h3 className="truncate font-semibold text-white">
                                                    {bug.title}
                                                </h3>

                                                <span className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-zinc-500">
                                                    {bug.difficulty}
                                                </span>

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[11px] ${bug.isPublished
                                                        ? "bg-emerald-500/10 text-emerald-400"
                                                        : "bg-zinc-500/10 text-zinc-500"
                                                        }`}
                                                >
                                                    {bug.isPublished
                                                        ? "Published"
                                                        : "Draft"}
                                                </span>

                                            </div>

                                            <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                                                {bug.description}
                                            </p>

                                            <div className="mt-3 flex items-center gap-4 text-xs text-zinc-600">

                                                <span>
                                                    {bug.points} points
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {bug.estimatedMinutes} min
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    Order {bug.displayOrder}
                                                </span>

                                            </div>

                                        </div>

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/bugs/${bug.id}`,
                                                )
                                            }
                                            className="shrink-0 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-orange-400"
                                        >
                                            Manage
                                        </button>

                                    </div>
                                </div>
                            ))}

                        </div>
                    )}

            </div>
        </section>
    );
}

function ProjectMeta({
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

                <p className="mt-1 text-sm font-medium text-zinc-300">
                    {value}
                </p>
            </div>
        </div>
    );
}