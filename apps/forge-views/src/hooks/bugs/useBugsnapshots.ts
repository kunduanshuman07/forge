import { bugSnapshotService } from "@/services/bug.service";
import { useQuery } from "@tanstack/react-query";


export function useBugSnapshots(
    bugId?: string,
) {
    return useQuery({
        queryKey: ["bug-snapshots", bugId],

        queryFn: async () => {
            if (!bugId) {
                throw new Error(
                    "Bug ID is required",
                );
            }

            const response =
                await bugSnapshotService.getSnapshots(
                    bugId,
                );

            return response.data.data;
        },

        enabled: Boolean(bugId),

        staleTime: 2 * 60 * 1000,
    });
}