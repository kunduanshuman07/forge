import {
    ArrowLeft,
    FolderKanban,
    Plus,
    Search,
} from "lucide-react";

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { useProjects } from "@/hooks/projects/useProjects";

export default function AdminProjectsPage() {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");

    const {
        data: projects,
        isLoading,
        isError,
        refetch,
    } = useProjects();

    const filteredProjects = useMemo(() => {
        if (!projects) {
            return [];
        }

        const query = search.trim().toLowerCase();

        if (!query) {
            return projects;
        }

        return projects.filter((project) =>
            [
                project.title,
                project.slug,
                project.category,
                project.language,
                project.framework,
                project.difficulty,
            ]
                .filter(Boolean)
                .some((value) =>
                    value
                        .toString()
                        .toLowerCase()
                        .includes(query),
                ),
        );
    }, [projects, search]);

    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-8 flex items-start justify-between gap-6">

                    <div>
                        <button
                            type="button"
                            onClick={() => navigate("/admin")}
                            className="mb-5 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                        >
                            <ArrowLeft size={16} />
                            Admin Console
                        </button>

                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                                <FolderKanban size={20} />
                            </div>

                            <div>
                                <p className="text-xs uppercase tracking-[0.2em] text-orange-400">
                                    Management
                                </p>

                                <h1 className="mt-1 text-3xl font-bold text-white">
                                    Projects
                                </h1>
                            </div>
                        </div>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-500">
                            Create and manage the projects that
                            contain Forge debugging challenges.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            navigate("/admin/projects/new")
                        }
                        className="flex shrink-0 items-center gap-2 rounded-xl bg-orange-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400"
                    >
                        <Plus size={17} />
                        Create Project
                    </button>
                </div>

                {/* Search */}

                <div className="mb-6">
                    <div className="relative max-w-md">
                        <Search
                            size={17}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600"
                        />

                        <input
                            value={search}
                            onChange={(event) =>
                                setSearch(event.target.value)
                            }
                            placeholder="Search projects..."
                            className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-2.5 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-orange-500/30"
                        />
                    </div>
                </div>

                {/* Loading */}

                {isLoading && (
                    <div className="space-y-3">
                        {[1, 2, 3].map((item) => (
                            <div
                                key={item}
                                className="h-28 animate-pulse rounded-2xl border border-white/10 bg-white/[0.03]"
                            />
                        ))}
                    </div>
                )}

                {/* Error */}

                {isError && !isLoading && (
                    <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-8 text-center">
                        <p className="font-medium text-white">
                            Failed to load projects
                        </p>

                        <p className="mt-2 text-sm text-zinc-500">
                            Something went wrong while loading
                            the projects.
                        </p>

                        <button
                            type="button"
                            onClick={() => refetch()}
                            className="mt-5 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:bg-white/5 hover:text-white"
                        >
                            Try again
                        </button>
                    </div>
                )}

                {/* Empty */}

                {!isLoading &&
                    !isError &&
                    filteredProjects.length === 0 && (
                        <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-12 text-center">
                            <FolderKanban
                                size={32}
                                className="mx-auto text-zinc-600"
                            />

                            <h2 className="mt-4 font-semibold text-white">
                                {search
                                    ? "No projects found"
                                    : "No projects yet"}
                            </h2>

                            <p className="mt-2 text-sm text-zinc-500">
                                {search
                                    ? "Try a different search term."
                                    : "Create your first Forge project to get started."}
                            </p>
                        </div>
                    )}

                {/* Projects */}

                {!isLoading &&
                    !isError &&
                    filteredProjects.length > 0 && (
                        <div className="space-y-3">
                            {filteredProjects.map(
                                (project) => (
                                    <div
                                        key={project.id}
                                        className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-500/20 hover:bg-white/[0.05]"
                                    >
                                        {/* Icon */}

                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition group-hover:text-orange-400">
                                            <FolderKanban
                                                size={20}
                                            />
                                        </div>

                                        {/* Main */}

                                        <div className="min-w-0 flex-1">
                                            <div className="flex items-center gap-3">
                                                <h2 className="truncate font-semibold text-white">
                                                    {
                                                        project.title
                                                    }
                                                </h2>

                                                <span
                                                    className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${project.isPublished
                                                            ? "bg-emerald-500/10 text-emerald-400"
                                                            : "bg-zinc-500/10 text-zinc-500"
                                                        }`}
                                                >
                                                    {project.isPublished
                                                        ? "Published"
                                                        : "Draft"}
                                                </span>
                                            </div>

                                            <p className="mt-1 line-clamp-1 text-sm text-zinc-500">
                                                {
                                                    project.shortDescription
                                                }
                                            </p>

                                            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-zinc-600">
                                                <span>
                                                    {
                                                        project.category
                                                    }
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {
                                                        project.language
                                                    }
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {
                                                        project.framework
                                                    }
                                                </span>

                                                <span>
                                                    •
                                                </span>

                                                <span>
                                                    {
                                                        project.difficulty
                                                    }
                                                </span>
                                            </div>
                                        </div>

                                        {/* Action */}

                                        <button
                                            type="button"
                                            onClick={() =>
                                                navigate(
                                                    `/admin/projects/${project.id}`,
                                                )
                                            }
                                            className="flex shrink-0 items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-zinc-400 transition hover:border-orange-500/30 hover:text-orange-400"
                                        >
                                            Manage
                                        </button>
                                    </div>
                                ),
                            )}
                        </div>
                    )}
            </div>
        </section>
    );
}