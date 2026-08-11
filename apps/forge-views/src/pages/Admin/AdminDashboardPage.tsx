import {
    Bug,
    ChevronRight,
    FolderKanban,
    Layers3,
    ShieldCheck,
    TestTube2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const stats = [
    {
        label: "Projects",
        value: "—",
        icon: FolderKanban,
        description: "Manage Forge projects",
    },
    {
        label: "Bugs",
        value: "—",
        icon: Bug,
        description: "Manage debugging challenges",
    },
    {
        label: "Snapshots",
        value: "—",
        icon: Layers3,
        description: "Manage project snapshots",
    },
    {
        label: "Test Cases",
        value: "—",
        icon: TestTube2,
        description: "Manage execution tests",
    },
];

export default function AdminDashboardPage() {
    const navigate = useNavigate();
    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-7xl">

                {/* Header */}

                <div className="mb-10 flex items-start justify-between">
                    <div>
                        <div className="mb-3 flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-orange-500/20 bg-orange-500/10 text-orange-400">
                                <ShieldCheck size={20} />
                            </div>

                            <p className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">
                                Admin Console
                            </p>
                        </div>

                        <h1 className="text-4xl font-bold tracking-tight text-white">
                            Forge Administration
                        </h1>

                        <p className="mt-3 max-w-2xl text-zinc-500">
                            Manage projects, debugging challenges,
                            execution environments and test cases.
                        </p>
                    </div>
                </div>

                {/* Stats */}

                <div className="mb-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;

                        return (
                            <div
                                key={stat.label}
                                className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-orange-500/20 hover:bg-white/[0.05]"
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-zinc-400 transition group-hover:text-orange-400">
                                        <Icon size={19} />
                                    </div>

                                    <span className="text-2xl font-bold text-white">
                                        {stat.value}
                                    </span>
                                </div>

                                <h3 className="mt-5 font-semibold text-white">
                                    {stat.label}
                                </h3>

                                <p className="mt-1 text-sm text-zinc-500">
                                    {stat.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                {/* Management */}

                <div className="mb-4">
                    <p className="text-xs font-medium uppercase tracking-[0.2em] text-zinc-600">
                        Management
                    </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">

                    <AdminManagementCard
                        icon={FolderKanban}
                        title="Projects"
                        description="Create and manage projects that contain Forge debugging challenges."
                        onClick={() =>
                            navigate("/admin/projects")
                        }
                    />

                    <AdminManagementCard
                        icon={Bug}
                        title="Bug Challenges"
                        description="Create bugs, configure difficulty, objectives and expected outcomes."
                    />

                    <AdminManagementCard
                        icon={Layers3}
                        title="Snapshots"
                        description="Configure runtimes, commands, resources and project versions."
                    />

                    <AdminManagementCard
                        icon={TestTube2}
                        title="Test Cases"
                        description="Define automated tests used to evaluate engineer submissions."
                    />

                </div>
            </div>
        </section>
    );
}

interface AdminManagementCardProps {
    icon: React.ComponentType<{
        size?: number;
        className?: string;
    }>;
    title: string;
    description: string;
    onClick?: () => void;
}

function AdminManagementCard({
    icon: Icon,
    title,
    description,
    onClick,
}: AdminManagementCardProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-6 text-left transition hover:border-orange-500/30 hover:bg-white/[0.05]"
        >
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 transition group-hover:border-orange-500/20 group-hover:text-orange-400">
                <Icon size={21} />
            </div>

            <div className="min-w-0 flex-1">
                <h3 className="font-semibold text-white">
                    {title}
                </h3>

                <p className="mt-1 text-sm leading-6 text-zinc-500">
                    {description}
                </p>
            </div>

            <ChevronRight
                size={18}
                className="shrink-0 text-zinc-600 transition group-hover:translate-x-1 group-hover:text-orange-400"
            />
        </button>
    );
}