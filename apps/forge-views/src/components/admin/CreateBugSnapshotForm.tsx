// src/components/admin/bug-snapshots/CreateBugSnapshotForm.tsx

import {
    type FormEvent,
    useState,
} from "react";

import {
    ArrowLeft,
    Loader2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useCreateBugSnapshot } from "@/hooks/bug-snapshots/useCreateBugSnapshot";

import type {
    CreateBugSnapshotDto,
    Runtime,
} from "@/types/bug-snapshot.types";

interface CreateBugSnapshotFormProps {
    projectId: string;
    bugId: string;
    onSuccess: () => void;
}

const runtimes: Runtime[] = [
    "NODE",
    "PYTHON",
    "JAVA",
    "GO",
];

export function CreateBugSnapshotForm({
    projectId,
    bugId,
    onSuccess,
}: CreateBugSnapshotFormProps) {
    const navigate = useNavigate();

    const createSnapshot =
        useCreateBugSnapshot(bugId);

    const [runtime, setRuntime] =
        useState<Runtime>("NODE");

    const [dockerImage, setDockerImage] =
        useState("");

    const [nodeVersion, setNodeVersion] =
        useState("");

    const [installCommand, setInstallCommand] =
        useState("");

    const [buildCommand, setBuildCommand] =
        useState("");

    const [startCommand, setStartCommand] =
        useState("");

    const [testCommand, setTestCommand] =
        useState("");

    const [entryPoint, setEntryPoint] =
        useState("");

    const [memoryLimitMb, setMemoryLimitMb] =
        useState("");

    const [cpuLimit, setCpuLimit] =
        useState("");

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

    const validate = () => {
        const nextErrors: Record<
            string,
            string
        > = {};

        if (!runtime) {
            nextErrors.runtime =
                "Runtime is required.";
        }

        if (
            dockerImage &&
            dockerImage.length > 100
        ) {
            nextErrors.dockerImage =
                "Docker image cannot exceed 100 characters.";
        }

        if (
            nodeVersion &&
            nodeVersion.length > 50
        ) {
            nextErrors.nodeVersion =
                "Node version cannot exceed 50 characters.";
        }

        if (
            memoryLimitMb &&
            Number(memoryLimitMb) < 1
        ) {
            nextErrors.memoryLimitMb =
                "Memory limit must be at least 1 MB.";
        }

        if (
            cpuLimit &&
            Number(cpuLimit) < 0.1
        ) {
            nextErrors.cpuLimit =
                "CPU limit must be at least 0.1.";
        }

        setErrors(nextErrors);

        return (
            Object.keys(nextErrors).length === 0
        );
    };

    const handleSubmit = async (
        event: FormEvent,
    ) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const payload: CreateBugSnapshotDto = {
            runtime,

            ...(dockerImage.trim() && {
                dockerImage:
                    dockerImage.trim(),
            }),

            ...(nodeVersion.trim() && {
                nodeVersion:
                    nodeVersion.trim(),
            }),

            ...(installCommand.trim() && {
                installCommand:
                    installCommand.trim(),
            }),

            ...(buildCommand.trim() && {
                buildCommand:
                    buildCommand.trim(),
            }),

            ...(startCommand.trim() && {
                startCommand:
                    startCommand.trim(),
            }),

            ...(testCommand.trim() && {
                testCommand:
                    testCommand.trim(),
            }),

            ...(entryPoint.trim() && {
                entryPoint:
                    entryPoint.trim(),
            }),

            ...(memoryLimitMb && {
                memoryLimitMb:
                    Number(memoryLimitMb),
            }),

            ...(cpuLimit && {
                cpuLimit:
                    Number(cpuLimit),
            }),
        };

        try {
            await createSnapshot.mutateAsync(
                payload,
            );

            onSuccess();
        } catch (error: any) {
            const message =
                error?.response?.data?.message;

            setErrors({
                form: Array.isArray(message)
                    ? message.join(" ")
                    : message ||
                    "Failed to create snapshot.",
            });
        }
    };

    const goBack = () => {
        navigate(
            `/admin/projects/${projectId}/bugs/${bugId}`,
        );
    };

    return (
        <section className="px-8 py-10">
            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="mb-8">

                    <button
                        type="button"
                        onClick={goBack}
                        className="mb-6 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to bug
                    </button>

                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-orange-400">
                        Bug Snapshot
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Create Snapshot
                    </h1>

                    <p className="mt-2 text-zinc-500">
                        Configure the runtime and execution
                        environment for this bug.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Runtime */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-white">
                                Runtime
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Define the environment in which
                                submissions will execute.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Runtime"
                                required
                                error={errors.runtime}
                            >
                                <select
                                    value={runtime}
                                    onChange={(e) =>
                                        setRuntime(
                                            e.target.value as Runtime,
                                        )
                                    }
                                    className={inputClass(
                                        !!errors.runtime,
                                    )}
                                >
                                    {runtimes.map(
                                        (item) => (
                                            <option
                                                key={item}
                                                value={item}
                                                className="bg-zinc-900"
                                            >
                                                {item}
                                            </option>
                                        ),
                                    )}
                                </select>
                            </Field>

                            <Field
                                label="Docker Image"
                                error={errors.dockerImage}
                            >
                                <input
                                    value={dockerImage}
                                    onChange={(e) =>
                                        setDockerImage(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="node:20-alpine"
                                    className={inputClass(
                                        !!errors.dockerImage,
                                    )}
                                />
                            </Field>

                            <Field
                                label="Node Version"
                                error={errors.nodeVersion}
                            >
                                <input
                                    value={nodeVersion}
                                    onChange={(e) =>
                                        setNodeVersion(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="20"
                                    className={inputClass(
                                        !!errors.nodeVersion,
                                    )}
                                />
                            </Field>

                        </div>

                    </div>

                    {/* Execution */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-white">
                                Execution Configuration
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Commands used to install, build,
                                start and test the project.
                            </p>
                        </div>

                        <div className="space-y-5">

                            <Field label="Install Command">
                                <input
                                    value={installCommand}
                                    onChange={(e) =>
                                        setInstallCommand(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="npm install"
                                    className={inputClass(false)}
                                />
                            </Field>

                            <Field label="Build Command">
                                <input
                                    value={buildCommand}
                                    onChange={(e) =>
                                        setBuildCommand(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="npm run build"
                                    className={inputClass(false)}
                                />
                            </Field>

                            <Field label="Start Command">
                                <input
                                    value={startCommand}
                                    onChange={(e) =>
                                        setStartCommand(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="npm run start:prod"
                                    className={inputClass(false)}
                                />
                            </Field>

                            <Field label="Test Command">
                                <input
                                    value={testCommand}
                                    onChange={(e) =>
                                        setTestCommand(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="npm test"
                                    className={inputClass(false)}
                                />
                            </Field>

                            <Field label="Entry Point">
                                <input
                                    value={entryPoint}
                                    onChange={(e) =>
                                        setEntryPoint(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="src/main.ts"
                                    className={inputClass(false)}
                                />
                            </Field>

                        </div>

                    </div>

                    {/* Resource Limits */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-white">
                                Resource Limits
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Control the resources available to
                                submission execution.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Memory Limit (MB)"
                                error={
                                    errors.memoryLimitMb
                                }
                            >
                                <input
                                    type="number"
                                    min={1}
                                    value={memoryLimitMb}
                                    onChange={(e) =>
                                        setMemoryLimitMb(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="512"
                                    className={inputClass(
                                        !!errors.memoryLimitMb,
                                    )}
                                />
                            </Field>

                            <Field
                                label="CPU Limit"
                                error={errors.cpuLimit}
                            >
                                <input
                                    type="number"
                                    min={0.1}
                                    step={0.1}
                                    value={cpuLimit}
                                    onChange={(e) =>
                                        setCpuLimit(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="1"
                                    className={inputClass(
                                        !!errors.cpuLimit,
                                    )}
                                />
                            </Field>

                        </div>

                    </div>

                    {/* API Error */}

                    {errors.form && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {errors.form}
                        </div>
                    )}

                    {/* Actions */}

                    <div className="flex justify-end gap-3">

                        <button
                            type="button"
                            onClick={goBack}
                            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                createSnapshot.isPending
                            }
                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {createSnapshot.isPending && (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            )}

                            {createSnapshot.isPending
                                ? "Creating..."
                                : "Create Snapshot"}
                        </button>

                    </div>

                </form>

            </div>
        </section>
    );
}

function Field({
    label,
    required,
    error,
    children,
}: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
}) {
    return (
        <div>
            <label className="mb-2 block text-sm font-medium text-zinc-300">
                {label}

                {required && (
                    <span className="ml-1 text-orange-400">
                        *
                    </span>
                )}
            </label>

            {children}

            {error && (
                <p className="mt-1.5 text-xs text-red-400">
                    {error}
                </p>
            )}
        </div>
    );
}

function inputClass(
    hasError: boolean,
) {
    return `w-full rounded-xl border ${hasError
            ? "border-red-500/50"
            : "border-white/10"
        } bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20`;
}