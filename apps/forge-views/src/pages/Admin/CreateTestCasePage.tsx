import { useState } from "react";
import {
    ArrowLeft,
    CheckCircle2,
    Loader2,
    Plus,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import { testCaseService } from "@/services/test-case.service";

import type {
    CreateTestCasePayload,
    TestCaseType,
} from "@/types/test-case.types";

const TEST_CASE_TYPES: {
    value: TestCaseType;
    label: string;
    description: string;
}[] = [
        {
            value: "UNIT",
            label: "Unit",
            description: "Tests a small isolated piece of functionality.",
        },
        {
            value: "INTEGRATION",
            label: "Integration",
            description: "Tests multiple components working together.",
        },
        {
            value: "E2E",
            label: "End-to-End",
            description: "Tests the complete application flow.",
        },
    ];

export default function CreateTestCasePage() {

    const navigate = useNavigate();

    const { snapshotId, bugId } = useParams<{
        snapshotId: string;
        bugId: string;
    }>();

    const [form, setForm] =
        useState<CreateTestCasePayload>({
            name: "",
            description: "",
            type: "UNIT",
            command: "",
            expectedOutput: "",
            timeoutSeconds: 30,
            points: 10,
            displayOrder: 1,
        });

    const [errors, setErrors] =
        useState<Record<string, string>>({});

    const [isSubmitting, setIsSubmitting] =
        useState(false);

    const [success, setSuccess] =
        useState(false);

    const [apiError, setApiError] =
        useState("");

    const updateField = <
        K extends keyof CreateTestCasePayload
    >(
        field: K,
        value: CreateTestCasePayload[K],
    ) => {

        setForm((previous) => ({
            ...previous,
            [field]: value,
        }));

        setErrors((previous) => ({
            ...previous,
            [field]: "",
        }));

        setApiError("");
    };

    const validate = () => {

        const nextErrors: Record<string, string> = {};

        if (!form.name.trim()) {
            nextErrors.name =
                "Test case name is required.";
        } else if (form.name.length > 255) {
            nextErrors.name =
                "Test case name cannot exceed 255 characters.";
        }

        if (!form.command.trim()) {
            nextErrors.command =
                "Test command is required.";
        }

        if (
            !form.timeoutSeconds ||
            form.timeoutSeconds < 1
        ) {
            nextErrors.timeoutSeconds =
                "Timeout must be at least 1 second.";
        }

        if (
            form.points === undefined ||
            form.points < 0
        ) {
            nextErrors.points =
                "Points cannot be negative.";
        }

        if (
            !form.displayOrder ||
            form.displayOrder < 1
        ) {
            nextErrors.displayOrder =
                "Display order must be at least 1.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const handleSubmit = async (
        event: React.FormEvent,
    ) => {

        event.preventDefault();

        if (!snapshotId) {
            setApiError(
                "Snapshot ID is missing.",
            );
            return;
        }

        if (!validate()) {
            return;
        }

        try {

            setIsSubmitting(true);
            setApiError("");

            await testCaseService.create(
                snapshotId,
                {
                    ...form,
                    name: form.name.trim(),
                    description:
                        form.description?.trim() || undefined,
                    command: form.command.trim(),
                    expectedOutput:
                        form.expectedOutput?.trim() ||
                        undefined,
                },
            );

            setSuccess(true);

            setTimeout(() => {

                if (bugId) {
                    navigate(
                        `/admin/bugs/${bugId}`,
                    );
                } else {
                    navigate(-1);
                }

            }, 800);

        } catch (error: any) {

            console.error(
                "Failed to create test case:",
                error,
            );

            const message =
                error?.response?.data?.message;

            setApiError(
                Array.isArray(message)
                    ? message.join(", ")
                    : message ||
                    "Failed to create test case.",
            );

        } finally {

            setIsSubmitting(false);
        }
    };

    return (
        <section className="px-8 py-10">

            <div className="mx-auto max-w-5xl">

                {/* Back */}

                <button
                    type="button"
                    onClick={() => navigate(-1)}
                    className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                    <ArrowLeft size={16} />

                    Back
                </button>

                {/* Header */}

                <div className="mb-10">

                    <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-orange-400">
                        Snapshot
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Create Test Case
                    </h1>

                    <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
                        Define a test that will be executed
                        against engineer submissions for this
                        snapshot.
                    </p>

                </div>

                {/* Form */}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* Basic information */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                        <div className="mb-6">

                            <h2 className="text-lg font-semibold text-white">
                                Test Case Details
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Basic information about what this
                                test validates.
                            </p>

                        </div>

                        <div className="grid gap-6">

                            {/* Name */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Name
                                    <span className="ml-1 text-orange-400">
                                        *
                                    </span>
                                </label>

                                <input
                                    value={form.name}
                                    onChange={(event) =>
                                        updateField(
                                            "name",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="Prevents negative stock"
                                    maxLength={255}
                                    className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 ${errors.name
                                        ? "border-red-500/60 focus:border-red-500"
                                        : "border-white/10 focus:border-orange-500/60"
                                        }`}
                                />

                                <div className="mt-2 flex justify-between">

                                    {errors.name ? (
                                        <p className="text-xs text-red-400">
                                            {errors.name}
                                        </p>
                                    ) : (
                                        <span />
                                    )}

                                    <span className="text-xs text-zinc-700">
                                        {form.name.length}/255
                                    </span>

                                </div>

                            </div>

                            {/* Description */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Description
                                </label>

                                <textarea
                                    value={
                                        form.description || ""
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "description",
                                            event.target.value,
                                        )
                                    }
                                    rows={4}
                                    placeholder="Describe what this test case verifies..."
                                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                                />

                            </div>

                        </div>

                    </div>

                    {/* Execution */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                        <div className="mb-6">

                            <h2 className="text-lg font-semibold text-white">
                                Execution
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Configure how Forge should execute
                                this test.
                            </p>

                        </div>

                        <div className="space-y-6">

                            {/* Type */}

                            <div>

                                <label className="mb-3 block text-sm font-medium text-zinc-300">
                                    Test Type
                                </label>

                                <div className="grid gap-3 md:grid-cols-3">

                                    {TEST_CASE_TYPES.map(
                                        (testType) => {

                                            const selected =
                                                form.type ===
                                                testType.value;

                                            return (
                                                <button
                                                    type="button"
                                                    key={
                                                        testType.value
                                                    }
                                                    onClick={() =>
                                                        updateField(
                                                            "type",
                                                            testType.value,
                                                        )
                                                    }
                                                    className={`rounded-xl border p-4 text-left transition ${selected
                                                        ? "border-orange-500/60 bg-orange-500/10"
                                                        : "border-white/10 bg-black/20 hover:border-white/20"
                                                        }`}
                                                >

                                                    <p
                                                        className={`text-sm font-semibold ${selected
                                                            ? "text-orange-400"
                                                            : "text-white"
                                                            }`}
                                                    >
                                                        {
                                                            testType.label
                                                        }
                                                    </p>

                                                    <p className="mt-1 text-xs leading-5 text-zinc-500">
                                                        {
                                                            testType.description
                                                        }
                                                    </p>

                                                </button>
                                            );
                                        },
                                    )}

                                </div>

                            </div>

                            {/* Command */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Test Command
                                    <span className="ml-1 text-orange-400">
                                        *
                                    </span>
                                </label>

                                <input
                                    value={form.command}
                                    onChange={(event) =>
                                        updateField(
                                            "command",
                                            event.target.value,
                                        )
                                    }
                                    placeholder="npm test -- negative-stock"
                                    className={`w-full rounded-xl border bg-black/30 px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-zinc-700 ${errors.command
                                        ? "border-red-500/60"
                                        : "border-white/10 focus:border-orange-500/60"
                                        }`}
                                />

                                {errors.command && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {errors.command}
                                    </p>
                                )}

                                <p className="mt-2 text-xs text-zinc-600">
                                    This command will be executed
                                    inside the snapshot runtime.
                                </p>

                            </div>

                            {/* Expected Output */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Expected Output
                                </label>

                                <textarea
                                    value={
                                        form.expectedOutput ||
                                        ""
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "expectedOutput",
                                            event.target.value,
                                        )
                                    }
                                    rows={5}
                                    placeholder="Insufficient stock"
                                    className="w-full resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 font-mono text-sm text-white outline-none transition placeholder:text-zinc-700 focus:border-orange-500/60"
                                />

                                <p className="mt-2 text-xs text-zinc-600">
                                    Leave empty if the test only
                                    depends on the exit code.
                                </p>

                            </div>

                        </div>

                    </div>

                    {/* Scoring */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6">

                        <div className="mb-6">

                            <h2 className="text-lg font-semibold text-white">
                                Scoring & Limits
                            </h2>

                        </div>

                        <div className="grid gap-5 md:grid-cols-3">

                            {/* Timeout */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Timeout (seconds)
                                </label>

                                <input
                                    type="number"
                                    min={1}
                                    value={
                                        form.timeoutSeconds ??
                                        ""
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "timeoutSeconds",
                                            Number(
                                                event.target.value,
                                            ),
                                        )
                                    }
                                    className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none ${errors.timeoutSeconds
                                        ? "border-red-500/60"
                                        : "border-white/10 focus:border-orange-500/60"
                                        }`}
                                />

                                {errors.timeoutSeconds && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {
                                            errors.timeoutSeconds
                                        }
                                    </p>
                                )}

                            </div>

                            {/* Points */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Points
                                </label>

                                <input
                                    type="number"
                                    min={0}
                                    value={
                                        form.points ?? ""
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "points",
                                            Number(
                                                event.target.value,
                                            ),
                                        )
                                    }
                                    className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none ${errors.points
                                        ? "border-red-500/60"
                                        : "border-white/10 focus:border-orange-500/60"
                                        }`}
                                />

                                {errors.points && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {errors.points}
                                    </p>
                                )}

                            </div>

                            {/* Display Order */}

                            <div>

                                <label className="mb-2 block text-sm font-medium text-zinc-300">
                                    Display Order
                                </label>

                                <input
                                    type="number"
                                    min={1}
                                    value={
                                        form.displayOrder
                                    }
                                    onChange={(event) =>
                                        updateField(
                                            "displayOrder",
                                            Number(
                                                event.target.value,
                                            ),
                                        )
                                    }
                                    className={`w-full rounded-xl border bg-black/30 px-4 py-3 text-sm text-white outline-none ${errors.displayOrder
                                        ? "border-red-500/60"
                                        : "border-white/10 focus:border-orange-500/60"
                                        }`}
                                />

                                {errors.displayOrder && (
                                    <p className="mt-2 text-xs text-red-400">
                                        {
                                            errors.displayOrder
                                        }
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                    {/* API Error */}

                    {apiError && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-400">
                            {apiError}
                        </div>
                    )}

                    {/* Success */}

                    {success && (
                        <div className="flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-400">

                            <CheckCircle2 size={18} />

                            Test case created successfully.

                        </div>
                    )}

                    {/* Actions */}

                    <div className="flex items-center justify-end gap-3">

                        <button
                            type="button"
                            onClick={() =>
                                navigate(-1)
                            }
                            disabled={isSubmitting}
                            className="rounded-xl border border-white/10 px-5 py-3 text-sm font-medium text-zinc-400 transition hover:border-white/20 hover:text-white disabled:opacity-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >

                            {isSubmitting ? (
                                <>
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />

                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Plus size={16} />

                                    Create Test Case
                                </>
                            )}

                        </button>

                    </div>

                </form>

            </div>

        </section>
    );
}