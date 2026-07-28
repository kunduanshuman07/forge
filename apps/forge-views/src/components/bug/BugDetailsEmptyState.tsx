import { Database } from "lucide-react";

interface BugDetailsEmptyStateProps {
    title?: string;
    description?: string;
}

export function BugDetailsEmptyState({
    title = "No Snapshot Found",
    description = "This bug doesn't have any snapshots available yet.",
}: BugDetailsEmptyStateProps) {
    return (
        <div className="flex min-h-[500px] items-center justify-center">

            <div className="max-w-md text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">

                    <Database
                        size={28}
                        className="text-zinc-500"
                    />

                </div>

                <h2 className="mt-6 text-2xl font-bold">

                    {title}

                </h2>

                <p className="mt-3 text-zinc-400">

                    {description}

                </p>

            </div>

        </div>
    );
}