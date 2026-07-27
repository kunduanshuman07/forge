import { Link } from "react-router-dom";
import {
    ArrowRight,
    Lock,
    Mail,
    User,
    AtSign,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PasswordInput } from "./PasswordInput";

import {
    signupSchema,
    type SignupFormData,
} from "@/schemas/auth.schema";

import { useSignup } from "@/hooks/auth/useSignup";

export function SignupForm() {
    const signupMutation = useSignup();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
        defaultValues: {
            username: "",
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            confirmPassword: "",
        },
    });

    const onSubmit = ({
        confirmPassword,
        ...values
    }: SignupFormData) => {
        signupMutation.mutate(values);
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            {/* Username */}

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                    Username
                </label>

                <div className="relative mt-2">
                    <AtSign className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                    <Input
                        placeholder="johndoe"
                        className="h-14 rounded-2xl border-white/10 bg-zinc-900/60 pl-12 text-base transition-all focus-visible:border-orange-500 focus-visible:ring-4 focus-visible:ring-orange-500/10"
                        {...register("username")}
                    />
                </div>

                {errors.username && (
                    <p className="text-sm text-red-500">
                        {errors.username.message}
                    </p>
                )}
            </div>

            {/* First & Last Name */}

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        First Name
                    </label>

                    <div className="relative mt-2">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                        <Input
                            placeholder="John"
                            className="h-14 rounded-2xl border-white/10 bg-zinc-900/60 pl-12 text-base transition-all focus-visible:border-orange-500 focus-visible:ring-4 focus-visible:ring-orange-500/10"
                            {...register("firstName")}
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-sm font-medium text-zinc-300">
                        Last Name
                    </label>

                    <div className="relative mt-2">
                        <User className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                        <Input
                            placeholder="Doe"
                            className="h-14 rounded-2xl border-white/10 bg-zinc-900/60 pl-12 text-base transition-all focus-visible:border-orange-500 focus-visible:ring-4 focus-visible:ring-orange-500/10"
                            {...register("lastName")}
                        />
                    </div>
                </div>
            </div>

            {/* Email */}

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                    Email Address
                </label>

                <div className="relative mt-2">
                    <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-500" />

                    <Input
                        type="email"
                        placeholder="john@example.com"
                        className="h-14 rounded-2xl border-white/10 bg-zinc-900/60 pl-12 text-base transition-all focus-visible:border-orange-500 focus-visible:ring-4 focus-visible:ring-orange-500/10"
                        {...register("email")}
                    />
                </div>

                {errors.email && (
                    <p className="text-sm text-red-500">
                        {errors.email.message}
                    </p>
                )}
            </div>

            {/* Password */}

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                    Password
                </label>

                <PasswordInput
                    icon={<Lock className="h-5 w-5 text-zinc-500" />}
                    placeholder="Create a password"
                    registration={register("password")}
                    error={errors.password?.message}
                />
            </div>

            {/* Confirm Password */}

            <div className="space-y-2">
                <label className="text-sm font-medium text-zinc-300">
                    Confirm Password
                </label>

                <PasswordInput
                    icon={<Lock className="h-5 w-5 text-zinc-500" />}
                    placeholder="Confirm your password"
                    registration={register("confirmPassword")}
                    error={errors.confirmPassword?.message}
                />
            </div>

            {/* Submit */}

            <Button
                type="submit"
                className="h-14 w-full rounded-2xl text-base font-semibold"
                disabled={signupMutation.isPending}
            >
                {signupMutation.isPending ? (
                    "Creating Account..."
                ) : (
                    <>
                        Create Account
                        <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                )}
            </Button>

            {/* Divider */}

            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-white/10" />
                </div>

                <div className="relative flex justify-center">
                    <span className="bg-[#0A0A0A] px-4 text-sm text-zinc-500">
                        OR
                    </span>
                </div>
            </div>

            {/* Login */}

            <p className="text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Link
                    to="/login"
                    className="font-semibold text-orange-500 transition hover:text-orange-400"
                >
                    Sign In
                </Link>
            </p>
        </form>
    );
}