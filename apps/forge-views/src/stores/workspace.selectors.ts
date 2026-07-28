import { useWorkspaceStore } from "./workspace.store";

export const useWorkspaceFiles = () =>
    useWorkspaceStore((state) => state.files);

export const useSelectedFileId = () =>
    useWorkspaceStore((state) => state.selectedFileId);

export const useSelectedFile = () =>
    useWorkspaceStore((state) => {
        return (
            state.files.find(
                (file) => file.id === state.selectedFileId
            ) ?? null
        );
    });

export const useOpenFileIds = () =>
    useWorkspaceStore((state) => state.openFileIds);

export const useDirtyFileIds = () =>
    useWorkspaceStore((state) => state.dirtyFileIds);