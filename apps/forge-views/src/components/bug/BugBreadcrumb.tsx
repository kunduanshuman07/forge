import { ChevronRight } from "lucide-react";

export function BugBreadcrumb() {
    return (
        <div className="mb-10 flex items-center gap-2 text-sm text-zinc-500">

            <span>Projects</span>

            <ChevronRight size={14} />

            <span>Authentication Service</span>

            <ChevronRight size={14} />

            <span className="text-orange-400">

                JWT Authentication Guard

            </span>

        </div>
    );
}