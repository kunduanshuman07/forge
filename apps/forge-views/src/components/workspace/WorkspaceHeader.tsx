import type { Bug } from "@/types/bug.types";
import type { Submission } from "@/types/submission.types";

interface WorkspaceHeaderProps {
    bug: Bug;
    submission: Submission;
}

export function WorkspaceHeader({
    bug,
    submission,
}: WorkspaceHeaderProps) {
    return (
        <div className="flex items-center justify-between border-b border-white/10 bg-[#090909] px-8 py-4">
            <div>
                <h1 className="font-['Space_Grotesk'] text-2xl font-bold">
                    {bug.title}
                </h1>

                <p className="mt-1 text-sm text-zinc-500">
                    Investigation #{submission.id.slice(0, 8)} • {submission.status}
                </p>
            </div>
        </div>
    );
}