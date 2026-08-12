import { useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Check,
    Loader2,
    Plus,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateProject } from "@/hooks/projects/useCreateProject";

import {
    createProjectSchema,
    type CreateProjectFormValues,
} from "@/validations/project.validation";

import { FormField } from "@/components/admin/FormField";
import { DIFFICULTY_OPTIONS, FRAMEWORK_OPTIONS, PROGRAMMING_LANGUAGE_OPTIONS } from "@/constants/project.constant";

export default function CreateProjectPage() {
    const navigate = useNavigate();

    const createProject = useCreateProject();

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        watch,
    } = useForm<CreateProjectFormValues>({
        resolver: zodResolver(createProjectSchema),

        mode: "onChange",

        defaultValues: {
            title: "",
            slug: "",
            shortDescription: "",
            description: "",
            category: "",
            language: "",
            framework: "",
            difficulty: "",
            estimatedHours: undefined,
            thumbnailUrl: "",
            bannerUrl: "",
            iconUrl: "",
            displayOrder: 1,
            isPublished: false,
        },
    });

    const title = watch("title");

    const onSubmit = async (
        values: CreateProjectFormValues,
    ) => {
        try {
            await createProject.mutateAsync({
                ...values,

                estimatedHours:
                    values.estimatedHours || undefined,

                thumbnailUrl:
                    values.thumbnailUrl || undefined,

                bannerUrl:
                    values.bannerUrl || undefined,

                iconUrl:
                    values.iconUrl || undefined,

                shortDescription:
                    values.shortDescription || undefined,

                description:
                    values.description || undefined,

                language:
                    values.language as any,

                framework:
                    values.framework as any,

                difficulty:
                    values.difficulty as any,
            });

            navigate("/projects");
        } catch (error: any) {
            const message =
                error?.response?.data?.message;

            if (
                typeof message === "string" &&
                message.toLowerCase().includes("slug")
            ) {
                setError("slug", {
                    type: "server",
                    message,
                });

                return;
            }

            setError("root", {
                type: "server",
                message:
                    typeof message === "string"
                        ? message
                        : "Failed to create project.",
            });
        }
    };

    return (
        <section className="px-8 py-12">
            <div className="mx-auto max-w-5xl">

                {/* Back */}
                <button
                    type="button"
                    onClick={() =>
                        navigate("/projects")
                    }
                    className="mb-8 flex items-center gap-2 text-sm text-zinc-500 transition hover:text-white"
                >
                    <ArrowLeft size={16} />

                    Back to projects
                </button>

                {/* Header */}
                <div className="mb-10">

                    <div className="mb-3 flex items-center gap-3">

                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                            <Plus size={20} />
                        </div>

                        <span className="text-sm font-medium uppercase tracking-[0.2em] text-orange-400">
                            Admin
                        </span>

                    </div>

                    <h1 className="text-4xl font-bold tracking-tight text-white">
                        Create Project
                    </h1>

                    <p className="mt-3 max-w-2xl text-zinc-500">
                        Create a new engineering project
                        that developers can use to solve
                        production-style bugs.
                    </p>
                </div>

                {/* Server Error */}
                {errors.root?.message && (
                    <div className="mb-6 rounded-xl border border-red-500/20 bg-red-500/10 px-5 py-4 text-sm text-red-400">
                        {errors.root.message}
                    </div>
                )}

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-8"
                >

                    {/* Basic Information */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">

                        <div className="mb-7">
                            <h2 className="text-lg font-semibold text-white">
                                Basic Information
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Define the identity and
                                purpose of the project.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormField
                                label="Project Title"
                                required
                                error={
                                    errors.title?.message
                                }
                            >
                                <input
                                    {...register("title")}
                                    placeholder="Broken API Guard"
                                    className="admin-input"
                                />
                            </FormField>

                            <FormField
                                label="Slug"
                                required
                                error={
                                    errors.slug?.message
                                }
                            >
                                <input
                                    {...register("slug")}
                                    placeholder="broken-api-guard"
                                    className="admin-input"
                                />
                            </FormField>

                            <div className="md:col-span-2">
                                <FormField
                                    label="Short Description"
                                    error={
                                        errors
                                            .shortDescription
                                            ?.message
                                    }
                                >
                                    <input
                                        {...register(
                                            "shortDescription",
                                        )}
                                        placeholder="Debug a broken authentication guard..."
                                        className="admin-input"
                                    />

                                    <div className="mt-1 text-right text-xs text-zinc-600">
                                        {
                                            watch(
                                                "shortDescription",
                                            )?.length ?? 0
                                        }
                                        /200
                                    </div>
                                </FormField>
                            </div>

                            <div className="md:col-span-2">
                                <FormField
                                    label="Description"
                                    error={
                                        errors
                                            .description
                                            ?.message
                                    }
                                >
                                    <textarea
                                        {...register(
                                            "description",
                                        )}
                                        rows={6}
                                        placeholder="Describe the engineering problem developers will solve..."
                                        className="admin-input resize-none"
                                    />
                                </FormField>
                            </div>

                            <FormField
                                label="Category"
                                required
                                error={
                                    errors.category?.message
                                }
                            >
                                <input
                                    {...register("category")}
                                    placeholder="Backend"
                                    className="admin-input"
                                />
                            </FormField>

                        </div>
                    </div>

                    {/* Technical Configuration */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">

                        <div className="mb-7">
                            <h2 className="text-lg font-semibold text-white">
                                Technical Configuration
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Configure the technology stack
                                and difficulty.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-3">

                            <FormField
                                label="Programming Language"
                                required
                                error={
                                    errors.language?.message
                                }
                            >
                                <select
                                    {...register("language")}
                                    className="admin-input"
                                >
                                    <option value="">
                                        Select language
                                    </option>

                                    {PROGRAMMING_LANGUAGE_OPTIONS.map(
                                        (option: any) => (
                                            <option
                                                key={
                                                    option.value
                                                }
                                                value={
                                                    option.value
                                                }
                                            >
                                                {
                                                    option.label
                                                }
                                            </option>
                                        ),
                                    )}
                                </select>
                            </FormField>

                            <FormField
                                label="Framework"
                                required
                                error={
                                    errors.framework?.message
                                }
                            >
                                <select
                                    {...register("framework")}
                                    className="admin-input"
                                >
                                    <option value="">
                                        Select framework
                                    </option>

                                    {FRAMEWORK_OPTIONS.map(
                                        (option: any) => (
                                            <option
                                                key={
                                                    option.value
                                                }
                                                value={
                                                    option.value
                                                }
                                            >
                                                {
                                                    option.label
                                                }
                                            </option>
                                        ),
                                    )}
                                </select>
                            </FormField>

                            <FormField
                                label="Difficulty"
                                required
                                error={
                                    errors.difficulty?.message
                                }
                            >
                                <select
                                    {...register(
                                        "difficulty",
                                    )}
                                    className="admin-input"
                                >
                                    <option value="">
                                        Select difficulty
                                    </option>

                                    {DIFFICULTY_OPTIONS.map(
                                        (option: any) => (
                                            <option
                                                key={
                                                    option.value
                                                }
                                                value={
                                                    option.value
                                                }
                                            >
                                                {
                                                    option.label
                                                }
                                            </option>
                                        ),
                                    )}
                                </select>
                            </FormField>

                        </div>
                    </div>

                    {/* Project Configuration */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">

                        <div className="mb-7">
                            <h2 className="text-lg font-semibold text-white">
                                Project Configuration
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Configure ordering and expected
                                completion time.
                            </p>
                        </div>

                        <div className="grid gap-6 md:grid-cols-2">

                            <FormField
                                label="Estimated Hours"
                                error={
                                    errors
                                        .estimatedHours
                                        ?.message
                                }
                            >
                                <input
                                    type="number"
                                    min={1}
                                    {...register(
                                        "estimatedHours",
                                        {
                                            setValueAs:
                                                (value) =>
                                                    value ===
                                                        ""
                                                        ? undefined
                                                        : Number(
                                                            value,
                                                        ),
                                        },
                                    )}
                                    placeholder="1"
                                    className="admin-input"
                                />
                            </FormField>

                            <FormField
                                label="Display Order"
                                required
                                error={
                                    errors
                                        .displayOrder
                                        ?.message
                                }
                            >
                                <input
                                    type="number"
                                    min={1}
                                    {...register(
                                        "displayOrder",
                                        {
                                            setValueAs:
                                                (value) =>
                                                    Number(
                                                        value,
                                                    ),
                                        },
                                    )}
                                    className="admin-input"
                                />
                            </FormField>

                        </div>
                    </div>

                    {/* Assets */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">

                        <div className="mb-7">
                            <h2 className="text-lg font-semibold text-white">
                                Project Assets
                            </h2>

                            <p className="mt-1 text-sm text-zinc-500">
                                Optional URLs for project
                                presentation.
                            </p>
                        </div>

                        <div className="space-y-6">

                            <FormField
                                label="Thumbnail URL"
                                error={
                                    errors
                                        .thumbnailUrl
                                        ?.message
                                }
                            >
                                <input
                                    {...register(
                                        "thumbnailUrl",
                                    )}
                                    placeholder="https://..."
                                    className="admin-input"
                                />
                            </FormField>

                            <FormField
                                label="Banner URL"
                                error={
                                    errors.bannerUrl?.message
                                }
                            >
                                <input
                                    {...register("bannerUrl")}
                                    placeholder="https://..."
                                    className="admin-input"
                                />
                            </FormField>

                            <FormField
                                label="Icon URL"
                                error={
                                    errors.iconUrl?.message
                                }
                            >
                                <input
                                    {...register("iconUrl")}
                                    placeholder="https://..."
                                    className="admin-input"
                                />
                            </FormField>

                        </div>
                    </div>

                    {/* Publishing */}
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">

                        <div className="flex items-center justify-between gap-6">

                            <div>
                                <h2 className="font-semibold text-white">
                                    Publish Project
                                </h2>

                                <p className="mt-1 text-sm text-zinc-500">
                                    Published projects will be
                                    visible to engineers.
                                </p>
                            </div>

                            <label className="relative inline-flex cursor-pointer items-center">
                                <input
                                    type="checkbox"
                                    {...register(
                                        "isPublished",
                                    )}
                                    className="peer sr-only"
                                />

                                <div className="h-6 w-11 rounded-full bg-zinc-700 transition peer-checked:bg-orange-500" />

                                <div className="absolute left-1 top-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-5" />
                            </label>

                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-end gap-3 border-t border-white/10 pt-6">

                        <button
                            type="button"
                            onClick={() =>
                                navigate("/projects")
                            }
                            disabled={
                                createProject.isPending
                            }
                            className="rounded-xl px-5 py-3 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-white"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={
                                createProject.isPending
                            }
                            className="flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 text-sm font-semibold text-black transition hover:bg-orange-400 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {createProject.isPending ? (
                                <>
                                    <Loader2
                                        size={16}
                                        className="animate-spin"
                                    />

                                    Creating...
                                </>
                            ) : (
                                <>
                                    <Check size={16} />

                                    Create Project
                                </>
                            )}
                        </button>

                    </div>

                </form>
            </div>
        </section>
    );
}