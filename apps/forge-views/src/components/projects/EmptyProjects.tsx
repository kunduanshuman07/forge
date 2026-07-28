import { FolderOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyProjectsProps {
    onCreateProject?: () => void;
}

export function EmptyProjects({
    onCreateProject,
}: EmptyProjectsProps) {
    return (
        <section className="flex min-h-[450px] items-center justify-center">

            <div className="max-w-xl text-center">

                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full border border-orange-500/20 bg-orange-500/10">

                    <FolderOpen className="h-12 w-12 text-orange-400" />

                </div>

                <h2 className="mt-8 font-['Space_Grotesk'] text-5xl font-bold">
                    No Projects Found
                </h2>

                <p className="mt-5 text-lg leading-8 text-zinc-400">
                    There aren't any engineering projects available yet.
                    Once projects are published, they'll appear here for you to
                    start building production-ready systems.
                </p>

                {onCreateProject && (
                    <Button
                        className="mt-10 h-12 rounded-2xl px-8"
                        onClick={onCreateProject}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Create Project
                    </Button>
                )}

            </div>

        </section>
    );
}