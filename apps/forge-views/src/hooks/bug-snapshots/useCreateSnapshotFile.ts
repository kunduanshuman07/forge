import { useMutation } from "@tanstack/react-query";

import type {
  CreateSnapshotFileDto,
} from "@/types/snapshot-file.types";
import { snapshotFileService } from "@/services/snapshot-file.service";

interface CreateSnapshotFileParams {
  snapshotId: string;
  data: CreateSnapshotFileDto;
}

export function useCreateSnapshotFile() {
  return useMutation({
    mutationFn: ({
      snapshotId,
      data,
    }: CreateSnapshotFileParams) =>
      snapshotFileService.create(
        snapshotId,
        data,
      ),
  });
}