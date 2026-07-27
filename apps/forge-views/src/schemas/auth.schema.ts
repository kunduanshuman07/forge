import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Please enter a valid email address."),
  password: z.string().min(1, "Password is required."),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signupSchema = z
  .object({
    email: z.email("Please enter a valid email address."),

    username: z
      .string()
      .min(3, "Username must be at least 3 characters.")
      .max(30, "Username cannot exceed 30 characters.")
      .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed."),

    firstName: z.string().optional(),

    lastName: z.string().optional(),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters.")
      .regex(/[A-Z]/, "Must contain an uppercase letter.")
      .regex(/[a-z]/, "Must contain a lowercase letter.")
      .regex(/[0-9]/, "Must contain a number.")
      .regex(/[^a-zA-Z0-9]/, "Must contain a special character."),

    confirmPassword: z.string(),
  })
  .refine((values) => values.password === values.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export type SignupFormData = z.infer<typeof signupSchema>;
