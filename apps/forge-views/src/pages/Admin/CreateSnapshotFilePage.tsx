import {
    useMemo,
    useRef,
    useState,
} from "react";

import {
    ArrowLeft,
    FileCode2,
    FileUp,
    FolderOpen,
    Loader2,
    Upload,
    X,
} from "lucide-react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";


import {
    detectFileType,
    detectLanguage,
    getExtension,
    getRelativePath,
    shouldExcludeFile,
} from "@/utils/snapshot-file.utils";
import { useCreateSnapshotFile } from "@/hooks/bug-snapshots/useCreateSnapshotFile";

interface PreparedFile {
    file: File;
    path: string;
    name: string;
    extension?: string;
    excluded: boolean;
    reason?: string;
}

export default function CreateSnapshotFilesPage() {
    const navigate = useNavigate();

    const {
        projectId,
        bugId,
        snapshotId,
    } = useParams();

    const inputRef =
        useRef<HTMLInputElement>(null);

    const createSnapshotFile =
        useCreateSnapshotFile();

    const [
        selectedFiles,
        setSelectedFiles,
    ] = useState<PreparedFile[]>([]);

    const [
        isUploading,
        setIsUploading,
    ] = useState(false);

    const [
        uploadProgress,
        setUploadProgress,
    ] = useState(0);

    const [
        error,
        setError,
    ] = useState<string | null>(null);

    const activeFiles = useMemo(
        () =>
            selectedFiles.filter(
                (file) => !file.excluded,
            ),
        [selectedFiles],
    );

    const excludedFiles = useMemo(
        () =>
            selectedFiles.filter(
                (file) => file.excluded,
            ),
        [selectedFiles],
    );

    const totalSize = useMemo(
        () =>
            activeFiles.reduce(
                (total, item) =>
                    total + item.file.size,
                0,
            ),
        [activeFiles],
    );

    const handleFolderSelect = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        const files = Array.from(
            event.target.files ?? [],
        );

        if (!files.length) {
            return;
        }

        setError(null);
        setUploadProgress(0);

        const prepared = files.map(
            (file): PreparedFile => {
                const path =
                    getRelativePath(file);

                const excluded =
                    shouldExcludeFile(path);

                return {
                    file,
                    path,
                    name: file.name,
                    extension:
                        getExtension(file.name),
                    excluded,
                    reason: excluded
                        ? "Excluded by Forge"
                        : undefined,
                };
            },
        );

        setSelectedFiles(prepared);

        // Allow selecting the same folder again.
        event.target.value = "";
    };

    const handleUpload = async () => {
        if (
            !snapshotId ||
            activeFiles.length === 0 ||
            isUploading
        ) {
            return;
        }

        try {
            setError(null);
            setIsUploading(true);
            setUploadProgress(0);

            for (
                let index = 0;
                index < activeFiles.length;
                index++
            ) {
                const item =
                    activeFiles[index];

                const content =
                    await item.file.text();

                const payload = {
                    path: item.path,
                    name: item.name,
                    extension: item.extension,
                    language:
                        detectLanguage(item.name),
                    type:
                        detectFileType(item.name),
                    content,
                    isEditable: true,
                    isHidden: false,
                    displayOrder: index + 1,
                };

                await createSnapshotFile.mutateAsync({
                    snapshotId,
                    data: payload,
                });

                setUploadProgress(
                    Math.round(
                        ((index + 1) /
                            activeFiles.length) *
                        100,
                    ),
                );
            }

            navigate(
                `/admin/projects/${projectId}/bugs/${bugId}`,
            );
        } catch (err: any) {
            console.error(
                "Failed to upload snapshot files:",
                err,
            );

            setError(
                err?.response?.data?.message ??
                "Failed to upload snapshot files. Please try again.",
            );
        } finally {
            setIsUploading(false);
        }
    };

    const formatBytes = (
        bytes: number,
    ) => {
        if (bytes === 0) {
            return "0 Bytes";
        }

        const units = [
            "Bytes",
            "KB",
            "MB",
            "GB",
        ];

        const index = Math.floor(
            Math.log(bytes) /
            Math.log(1024),
        );

        return `${(
            bytes /
            Math.pow(1024, index)
        ).toFixed(1)} ${units[index]}`;
    };

    return (
        <section className="px-8 py-10">
            <div className="mx-auto max-w-6xl">

                <button
                    type="button"
                    onClick={() =>
                        navigate(-1)
                    }
                    className="mb-8 flex items-center gap-2 text-sm text-zinc-400 transition hover:text-white"
                >
                    <ArrowLeft size={16} />
                    Back to Snapshot
                </button>

                <div className="mb-10">
                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
                        Snapshot Files
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Upload Project Files
                    </h1>

                    <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                        Upload the complete, tested project
                        folder for this snapshot. Forge will
                        automatically preserve the folder
                        structure and create the required
                        snapshot files.
                    </p>
                </div>

                {/* Information */}
                <div className="mb-8 rounded-2xl border border-orange-500/20 bg-orange-500/[0.05] p-5">
                    <div className="flex gap-4">

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                            <FileUp size={19} />
                        </div>

                        <div>
                            <h3 className="font-semibold text-white">
                                Upload only tested project files
                            </h3>

                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                                Make sure this project has already
                                been tested successfully using the
                                runtime and commands configured for
                                this snapshot.
                            </p>

                            <p className="mt-2 text-sm leading-6 text-zinc-400">
                                Do not upload secrets such as API
                                keys, passwords, private certificates,
                                environment files or production
                                credentials.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Folder picker */}
                {selectedFiles.length === 0 && (
                    <button
                        type="button"
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        className="group flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-8 py-20 transition hover:border-orange-500/40 hover:bg-orange-500/[0.03]"
                    >
                        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400 transition group-hover:scale-105">
                            <FolderOpen size={30} />
                        </div>

                        <h2 className="text-lg font-semibold text-white">
                            Select Project Folder
                        </h2>

                        <p className="mt-2 text-sm text-zinc-500">
                            Select the root folder containing
                            your tested project
                        </p>

                        <span className="mt-6 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400">
                            Choose Folder
                        </span>
                    </button>
                )}

                <input
                    ref={inputRef}
                    type="file"
                    multiple
                    // @ts-expect-error - browser-specific folder upload attribute
                    webkitdirectory=""
                    className="hidden"
                    onChange={
                        handleFolderSelect
                    }
                />

                {/* File preview */}
                {selectedFiles.length > 0 && (
                    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">

                        <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

                            <div>
                                <h2 className="font-semibold text-white">
                                    Files Ready for Upload
                                </h2>

                                <p className="mt-1 text-xs text-zinc-500">
                                    {activeFiles.length} files ·{" "}
                                    {formatBytes(totalSize)}
                                </p>
                            </div>

                            <button
                                type="button"
                                disabled={isUploading}
                                onClick={() =>
                                    inputRef.current?.click()
                                }
                                className="rounded-xl border border-white/10 px-4 py-2 text-sm text-zinc-300 transition hover:border-orange-500/30 hover:text-white disabled:opacity-50"
                            >
                                Choose Different Folder
                            </button>

                        </div>

                        <div className="max-h-[420px] overflow-auto">

                            {selectedFiles.map(
                                (item, index) => (
                                    <div
                                        key={`${item.path}-${index}`}
                                        className={`flex items-center gap-4 border-b border-white/[0.06] px-6 py-3 last:border-0 ${item.excluded
                                                ? "opacity-50"
                                                : ""
                                            }`}
                                    >
                                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-zinc-400">
                                            {item.excluded ? (
                                                <X size={16} />
                                            ) : (
                                                <FileCode2
                                                    size={16}
                                                />
                                            )}
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm text-zinc-200">
                                                {item.path}
                                            </p>

                                            {item.excluded && (
                                                <p className="mt-0.5 text-xs text-zinc-600">
                                                    {item.reason}
                                                </p>
                                            )}
                                        </div>

                                        {!item.excluded && (
                                            <span className="text-xs text-zinc-600">
                                                {item.extension
                                                    ? `.${item.extension}`
                                                    : "file"}
                                            </span>
                                        )}

                                    </div>
                                ),
                            )}

                        </div>

                        {excludedFiles.length > 0 && (
                            <div className="border-t border-white/10 bg-white/[0.02] px-6 py-4 text-xs text-zinc-500">
                                {excludedFiles.length} file
                                {excludedFiles.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                excluded automatically because
                                they are unnecessary or potentially
                                sensitive.
                            </div>
                        )}

                        {error && (
                            <div className="border-t border-red-500/20 bg-red-500/[0.05] px-6 py-4 text-sm text-red-400">
                                {error}
                            </div>
                        )}

                        {isUploading && (
                            <div className="border-t border-white/10 px-6 py-5">

                                <div className="mb-2 flex items-center justify-between text-xs">
                                    <span className="text-zinc-400">
                                        Uploading snapshot files...
                                    </span>

                                    <span className="text-orange-400">
                                        {uploadProgress}%
                                    </span>
                                </div>

                                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                                    <div
                                        className="h-full rounded-full bg-orange-500 transition-all duration-300"
                                        style={{
                                            width: `${uploadProgress}%`,
                                        }}
                                    />
                                </div>

                            </div>
                        )}

                        <div className="flex items-center justify-end gap-3 border-t border-white/10 px-6 py-5">

                            <button
                                type="button"
                                disabled={isUploading}
                                onClick={() =>
                                    navigate(-1)
                                }
                                className="rounded-xl px-5 py-2.5 text-sm text-zinc-400 transition hover:text-white disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={
                                    isUploading ||
                                    activeFiles.length === 0
                                }
                                onClick={handleUpload}
                                className="flex items-center gap-2 rounded-xl bg-orange-500 px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {isUploading ? (
                                    <>
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                        Uploading...
                                    </>
                                ) : (
                                    <>
                                        <Upload size={16} />
                                        Upload{" "}
                                        {activeFiles.length} Files
                                    </>
                                )}
                            </button>

                        </div>

                    </div>
                )}

            </div>
        </section>
    );
}