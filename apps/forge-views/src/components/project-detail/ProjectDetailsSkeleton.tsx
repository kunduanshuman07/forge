import { Skeleton } from "@/components/ui/skeleton";

export function ProjectDetailsSkeleton() {
    return (
        <div className="space-y-10">

            <div>
                <Skeleton className="h-5 w-40 bg-white/10" />

                <Skeleton className="mt-5 h-12 w-96 bg-white/10" />

                <Skeleton className="mt-6 h-5 w-3/4 bg-white/10" />
                <Skeleton className="mt-3 h-5 w-2/3 bg-white/10" />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/[0.04]">

                {Array.from({ length: 6 }).map((_, index) => (
                    <div
                        key={index}
                        className={`flex items-center justify-between px-8 py-7 ${index !== 5
                                ? "border-b border-white/10"
                                : ""
                            }`}
                    >
                        <div className="flex items-center gap-5">

                            <Skeleton className="h-5 w-5 rounded-full bg-white/10" />

                            <div>
                                <Skeleton className="h-5 w-56 bg-white/10" />

                                <div className="mt-3 flex gap-4">

                                    <Skeleton className="h-4 w-24 bg-white/10" />

                                    <Skeleton className="h-4 w-20 bg-white/10" />

                                    <Skeleton className="h-4 w-16 bg-white/10" />

                                </div>

                            </div>

                        </div>

                        <Skeleton className="h-5 w-8 bg-white/10" />

                    </div>
                ))}

            </div>

        </div>
    );
}