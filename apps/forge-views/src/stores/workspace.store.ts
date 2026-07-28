import { create } from "zustand";

import type { SubmissionFile } from "@/types/submission-file.types";

interface WorkspaceState {
    files: SubmissionFile[];

    openFileIds: string[];

    selectedFileId: string | null;

    dirtyFileIds: string[];

    setFiles: (files: SubmissionFile[]) => void;

    openFile: (fileId: string) => void;

    closeFile: (fileId: string) => void;

    selectFile: (fileId: string) => void;

    updateFileContent: (
        fileId: string,
        content: string,
    ) => void;

    markFileSaved: (
        updatedFile: SubmissionFile,
    ) => void;
}

export const useWorkspaceStore = create<WorkspaceState>((set) => ({
    files: [],

    dirtyFileIds: [],

    openFileIds: [],

    selectedFileId: null,

    setFiles: (files) =>
        set({
            files,
        }),

    selectFile: (fileId) =>
        set({
            selectedFileId: fileId,
        }),

    updateFileContent: (fileId, content) =>
        set((state) => {
            const files = state.files.map((file) =>
                file.id === fileId
                    ? {
                        ...file,
                        content,
                    }
                    : file,
            );

            const dirtyFileIds = state.dirtyFileIds.includes(fileId)
                ? state.dirtyFileIds
                : [...state.dirtyFileIds, fileId];

            return {
                files,
                dirtyFileIds,
            };
        }),

    openFile: (fileId) =>
        set((state) => {
            if (state.openFileIds.includes(fileId)) {
                return {
                    selectedFileId: fileId,
                };
            }

            return {
                openFileIds: [
                    ...state.openFileIds,
                    fileId,
                ],
                selectedFileId: fileId,
            };
        }),

    closeFile: (fileId) =>
        set((state) => {
            const openFileIds = state.openFileIds.filter(
                (id) => id !== fileId,
            );

            let selectedFileId = state.selectedFileId;

            if (selectedFileId === fileId) {
                selectedFileId =
                    openFileIds.length > 0
                        ? openFileIds[openFileIds.length - 1]
                        : null;
            }

            return {
                openFileIds,
                selectedFileId,
            };
        }),

    markFileSaved: (updatedFile) =>
        set((state) => ({
            files: state.files.map((file) =>
                file.id === updatedFile.id
                    ? updatedFile
                    : file,
            ),

            dirtyFileIds: state.dirtyFileIds.filter(
                (id) => id !== updatedFile.id,
            ),
        })),
}));

export const useSelectedFile = () =>
    useWorkspaceStore((state) =>
        state.files.find(
            (file) => file.id === state.selectedFileId,
        ) ?? null,
    );