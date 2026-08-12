// src/hooks/bug-snapshots/useCreateBugSnapshot.ts

import {
    useMutation,
    useQueryClient,
} from "@tanstack/react-query";

import { bugSnapshotService } from "@/services/bug-snapshot.service";

import type {
    CreateBugSnapshotDto,
} from "@/types/bug-snapshot.types";

export function useCreateBugSnapshot(
    bugId: string,
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (
            data: CreateBugSnapshotDto,
        ) =>
            bugSnapshotService.createSnapshot(
                bugId,
                data,
            ),

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["bug-snapshots", bugId],
            });

            queryClient.invalidateQueries({
                queryKey: ["bug", bugId],
            });
        },
    });
}