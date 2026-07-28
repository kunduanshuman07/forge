import { Skeleton } from "@/components/ui/skeleton";

export function BugDetailsSkeleton() {
    return (
        <div className="space-y-10">

            {/* Header */}

            <div>

                <Skeleton className="h-5 w-40 bg-white/10" />

                <Skeleton className="mt-5 h-12 w-96 bg-white/10" />

                <Skeleton className="mt-6 h-5 w-2/3 bg-white/10" />

            </div>

            {/* Main Layout */}

            <div className="grid gap-6 lg:grid-cols-[280px_1fr]">

                {/* File Explorer */}

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

                    <Skeleton className="h-6 w-32 bg-white/10" />

                    <div className="mt-6 space-y-4">

                        {Array.from({ length: 8 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-5 w-full bg-white/10"
                            />
                        ))}

                    </div>

                </div>

                {/* Editor */}

                <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">

                    <Skeleton className="h-6 w-48 bg-white/10" />

                    <div className="mt-6 space-y-3">

                        {Array.from({ length: 18 }).map((_, index) => (
                            <Skeleton
                                key={index}
                                className="h-4 w-full bg-white/10"
                            />
                        ))}

                    </div>

                </div>

            </div>

        </div>
    );
}