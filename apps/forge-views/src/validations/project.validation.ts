import { z } from "zod";

export const createProjectSchema = z.object({
    title: z
        .string()
        .min(1, "Project title is required.")
        .max(100, "Project title cannot exceed 100 characters."),

    slug: z
        .string()
        .min(1, "Project slug is required.")
        .max(100, "Project slug cannot exceed 100 characters.")
        .regex(
            /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
            "Slug must contain only lowercase letters, numbers and hyphens.",
        ),

    shortDescription: z
        .string()
        .max(
            200,
            "Short description cannot exceed 200 characters.",
        )
        .optional()
        .or(z.literal("")),

    description: z
        .string()
        .optional()
        .or(z.literal("")),

    category: z
        .string()
        .min(1, "Category is required.")
        .max(
            100,
            "Category cannot exceed 100 characters.",
        ),

    language: z
        .string()
        .min(1, "Programming language is required."),

    framework: z
        .string()
        .min(1, "Framework is required."),

    difficulty: z
        .string()
        .min(1, "Difficulty is required."),

    estimatedHours: z
        .number()
        .int("Estimated hours must be a whole number.")
        .min(1, "Estimated hours must be at least 1.")
        .optional(),

    thumbnailUrl: z
        .string()
        .url("Please enter a valid thumbnail URL.")
        .optional()
        .or(z.literal("")),

    bannerUrl: z
        .string()
        .url("Please enter a valid banner URL.")
        .optional()
        .or(z.literal("")),

    iconUrl: z
        .string()
        .url("Please enter a valid icon URL.")
        .optional()
        .or(z.literal("")),

    displayOrder: z
        .number()
        .int("Display order must be a whole number.")
        .min(1, "Display order must be at least 1."),

    isPublished: z.boolean(),
});

export type CreateProjectFormValues = z.infer<
    typeof createProjectSchema
>;