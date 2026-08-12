// src/components/admin/bugs/CreateBugForm.tsx

import { type FormEvent, useState } from "react";
import { ArrowLeft, Loader2, Plus, X } from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useCreateBug } from "@/hooks/bugs/useCreateBug";

import type {
    Bug,
    CreateBugDto,
    Difficulty,
} from "@/types/bug.types";

interface CreateBugFormProps {
    projectId: string;
    onSuccess: (bug: Bug) => void;
    onCancel: () => void;
}

const difficulties: Difficulty[] = [
    "BEGINNER",
    "INTERMEDIATE",
    "ADVANCED",
    "EXPERT",
];

export function CreateBugForm({
    projectId,
    onSuccess,
    onCancel,
}: CreateBugFormProps) {
    const navigate = useNavigate();

    const createBug = useCreateBug(projectId);

    const [title, setTitle] = useState("");
    const [slug, setSlug] = useState("");

    const [description, setDescription] =
        useState("");

    const [expectedOutcome, setExpectedOutcome] =
        useState("");

    const [difficulty, setDifficulty] =
        useState<Difficulty>("BEGINNER");

    const [estimatedMinutes, setEstimatedMinutes] =
        useState("");

    const [points, setPoints] = useState("");

    const [displayOrder, setDisplayOrder] =
        useState("");

    const [isPublished, setIsPublished] =
        useState(false);

    const [learningObjectives, setLearningObjectives] =
        useState<string[]>([]);

    const [objectiveInput, setObjectiveInput] =
        useState("");

    const [errors, setErrors] = useState<
        Record<string, string>
    >({});

    const validate = () => {
        const nextErrors: Record<string, string> = {};

        if (!title.trim()) {
            nextErrors.title = "Title is required.";
        } else if (title.length > 150) {
            nextErrors.title =
                "Title cannot exceed 150 characters.";
        }

        if (!slug.trim()) {
            nextErrors.slug = "Slug is required.";
        } else if (slug.length > 150) {
            nextErrors.slug =
                "Slug cannot exceed 150 characters.";
        }

        if (!difficulty) {
            nextErrors.difficulty =
                "Difficulty is required.";
        }

        if (
            !displayOrder ||
            Number(displayOrder) < 1
        ) {
            nextErrors.displayOrder =
                "Display order must be at least 1.";
        }

        if (
            estimatedMinutes &&
            Number(estimatedMinutes) < 1
        ) {
            nextErrors.estimatedMinutes =
                "Estimated minutes must be at least 1.";
        }

        if (points && Number(points) < 0) {
            nextErrors.points =
                "Points cannot be negative.";
        }

        setErrors(nextErrors);

        return Object.keys(nextErrors).length === 0;
    };

    const addObjective = () => {
        const value = objectiveInput.trim();

        if (!value) {
            return;
        }

        setLearningObjectives((current) => [
            ...current,
            value,
        ]);

        setObjectiveInput("");
    };

    const removeObjective = (index: number) => {
        setLearningObjectives((current) =>
            current.filter(
                (_, objectiveIndex) =>
                    objectiveIndex !== index,
            ),
        );
    };

    const handleSubmit = async (
        event: FormEvent,
    ) => {
        event.preventDefault();

        if (!validate()) {
            return;
        }

        const payload: CreateBugDto = {
            title: title.trim(),
            slug: slug.trim(),
            difficulty,
            displayOrder: Number(displayOrder),
            isPublished,

            ...(description.trim() && {
                description: description.trim(),
            }),

            ...(expectedOutcome.trim() && {
                expectedOutcome:
                    expectedOutcome.trim(),
            }),

            ...(learningObjectives.length > 0 && {
                learningObjectives,
            }),

            ...(estimatedMinutes && {
                estimatedMinutes:
                    Number(estimatedMinutes),
            }),

            ...(points && {
                points: Number(points),
            }),
        };

        try {
            const response =
                await createBug.mutateAsync(payload);

            onSuccess(response.data.data);
        } catch (error: any) {
            const message =
                error?.response?.data?.message;

            if (Array.isArray(message)) {
                setErrors({
                    form: message.join(" "),
                });
            } else {
                setErrors({
                    form:
                        message ||
                        "Failed to create bug.",
                });
            }
        }
    };

    return (
        <section className="px-8 py-10">
            <div className="mx-auto max-w-5xl">

                {/* Header */}

                <div className="mb-8">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="mb-6 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                    >
                        <ArrowLeft size={16} />
                        Back to project
                    </button>

                    <p className="mb-2 text-sm uppercase tracking-[0.2em] text-orange-400">
                        Bug Engine
                    </p>

                    <h1 className="text-3xl font-bold text-white">
                        Create Bug
                    </h1>

                    <p className="mt-2 text-zinc-500">
                        Define a production-style problem for
                        engineers to debug.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                >

                    {/* General */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-white">
                                Bug Details
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Basic information about the bug.
                            </p>
                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <Field
                                label="Title"
                                required
                                error={errors.title}
                            >
                                <input
                                    value={title}
                                    onChange={(e) =>
                                        setTitle(e.target.value)
                                    }
                                    placeholder="Broken API Guard"
                                    className={inputClass(
                                        !!errors.title,
                                    )}
                                />
                            </Field>

                            <Field
                                label="Slug"
                                required
                                error={errors.slug}
                            >
                                <input
                                    value={slug}
                                    onChange={(e) =>
                                        setSlug(
                                            e.target.value
                                                .toLowerCase()
                                                .replace(/\s+/g, "-"),
                                        )
                                    }
                                    placeholder="broken-api-guard"
                                    className={inputClass(
                                        !!errors.slug,
                                    )}
                                />
                            </Field>

                            <Field
                                label="Difficulty"
                                required
                                error={errors.difficulty}
                            >
                                <select
                                    value={difficulty}
                                    onChange={(e) =>
                                        setDifficulty(
                                            e.target.value as Difficulty,
                                        )
                                    }
                                    className={inputClass(
                                        !!errors.difficulty,
                                    )}
                                >
                                    {difficulties.map((item) => (
                                        <option
                                            key={item}
                                            value={item}
                                            className="bg-zinc-900"
                                        >
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </Field>

                            <Field
                                label="Display Order"
                                required
                                error={errors.displayOrder}
                            >
                                <input
                                    type="number"
                                    min={1}
                                    value={displayOrder}
                                    onChange={(e) =>
                                        setDisplayOrder(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="1"
                                    className={inputClass(
                                        !!errors.displayOrder,
                                    )}
                                />
                            </Field>

                            <Field
                                label="Estimated Minutes"
                                error={errors.estimatedMinutes}
                            >
                                <input
                                    type="number"
                                    min={1}
                                    value={estimatedMinutes}
                                    onChange={(e) =>
                                        setEstimatedMinutes(
                                            e.target.value,
                                        )
                                    }
                                    placeholder="15"
                                    className={inputClass(
                                        !!errors.estimatedMinutes,
                                    )}
                                />
                            </Field>

                            <Field
                                label="Points"
                                error={errors.points}
                            >
                                <input
                                    type="number"
                                    min={0}
                                    value={points}
                                    onChange={(e) =>
                                        setPoints(e.target.value)
                                    }
                                    placeholder="50"
                                    className={inputClass(
                                        !!errors.points,
                                    )}
                                />
                            </Field>

                        </div>

                        <div className="mt-5">

                            <Field label="Description">
                                <textarea
                                    value={description}
                                    onChange={(e) =>
                                        setDescription(e.target.value)
                                    }
                                    rows={6}
                                    placeholder="Describe the production issue..."
                                    className={inputClass(false)}
                                />
                            </Field>

                        </div>

                    </div>

                    {/* Learning */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <div className="mb-6">
                            <h2 className="text-lg font-semibold text-white">
                                Learning Objectives
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                What should the engineer learn by
                                solving this bug?
                            </p>
                        </div>

                        <div className="flex gap-3">

                            <input
                                value={objectiveInput}
                                onChange={(e) =>
                                    setObjectiveInput(
                                        e.target.value,
                                    )
                                }
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.preventDefault();
                                        addObjective();
                                    }
                                }}
                                placeholder="Understand NestJS authentication guards"
                                className={inputClass(false)}
                            />

                            <button
                                type="button"
                                onClick={addObjective}
                                className="flex shrink-0 items-center gap-2 rounded-xl bg-white/10 px-4 text-sm text-white transition hover:bg-white/15"
                            >
                                <Plus size={16} />
                                Add
                            </button>

                        </div>

                        {learningObjectives.length > 0 && (
                            <div className="mt-4 space-y-2">
                                {learningObjectives.map(
                                    (objective, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/20 px-4 py-3"
                                        >
                                            <span className="text-sm text-zinc-300">
                                                {objective}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeObjective(index)
                                                }
                                                className="text-zinc-600 transition hover:text-red-400"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ),
                                )}
                            </div>
                        )}

                    </div>

                    {/* Expected outcome */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <Field label="Expected Outcome">
                            <textarea
                                value={expectedOutcome}
                                onChange={(e) =>
                                    setExpectedOutcome(
                                        e.target.value,
                                    )
                                }
                                rows={5}
                                placeholder="Valid API keys should receive HTTP 200 while unauthorized requests receive HTTP 401."
                                className={inputClass(false)}
                            />
                        </Field>

                    </div>

                    {/* Publishing */}

                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">

                        <label className="flex cursor-pointer items-center justify-between">

                            <div>
                                <p className="font-medium text-white">
                                    Publish Bug
                                </p>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Published bugs will be visible to
                                    engineers.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setIsPublished(
                                        (current) => !current,
                                    )
                                }
                                className={`relative h-6 w-11 rounded-full transition ${isPublished
                                        ? "bg-orange-500"
                                        : "bg-zinc-700"
                                    }`}
                            >
                                <span
                                    className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${isPublished
                                            ? "left-6"
                                            : "left-1"
                                        }`}
                                />
                            </button>

                        </label>

                    </div>

                    {/* API Error */}

                    {errors.form && (
                        <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
                            {errors.form}
                        </div>
                    )}

                    {/* Actions */}

                    <div className="flex items-center justify-end gap-3">

                        <button
                            type="button"
                            onClick={onCancel}
                            className="rounded-xl border border-white/10 px-5 py-3 text-sm text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={createBug.isPending}
                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {createBug.isPending && (
                                <Loader2
                                    size={16}
                                    className="animate-spin"
                                />
                            )}

                            {createBug.isPending
                                ? "Creating..."
                                : "Create Bug"}
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

function inputClass(hasError: boolean) {
    return `w-full rounded-xl border ${hasError
            ? "border-red-500/50"
            : "border-white/10"
        } bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-zinc-700 transition focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/20`;
}