import { Skeleton } from "@/components/ui/skeleton";

export function ProjectsSkeleton() {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-xl"
                >
                    <Skeleton className="h-6 w-24 rounded-full bg-white/10" />

                    <Skeleton className="mt-6 h-8 w-3/4 bg-white/10" />

                    <Skeleton className="mt-4 h-4 w-full bg-white/10" />
                    <Skeleton className="mt-2 h-4 w-5/6 bg-white/10" />

                    <div className="mt-8 flex justify-between">
                        <Skeleton className="h-5 w-20 bg-white/10" />
                        <Skeleton className="h-5 w-16 bg-white/10" />
                    </div>

                    <Skeleton className="mt-8 h-2 w-full rounded-full bg-white/10" />

                    <Skeleton className="mt-8 h-12 w-full rounded-2xl bg-white/10" />
                </div>
            ))}
        </div>
    );
}