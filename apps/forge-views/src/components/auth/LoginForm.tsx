import { Link } from "react-router-dom";
import { ArrowRight, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { PasswordInput } from "./PasswordInput";

import { loginSchema, type LoginFormData } from "@/schemas/auth.schema";
import { useLogin } from "@/hooks/auth/useLogin";

export function LoginForm() {
  const loginMutation = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: LoginFormData) => {
    loginMutation.mutate(values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
    >
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
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-zinc-300">
            Password
          </label>

          <Link
            to="/forgot-password"
            className="text-sm text-orange-500 transition hover:text-orange-400"
          >
            Forgot Password?
          </Link>
        </div>

        <PasswordInput
          icon={<Lock className="h-5 w-5 text-zinc-500" />}
          placeholder="Enter your password"
          registration={register("password")}
          error={errors.password?.message}
        />
      </div>

      {/* Submit */}

      <Button
        type="submit"
        className="h-14 w-full rounded-2xl text-base font-semibold"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? (
          "Signing In..."
        ) : (
          <>
            Continue
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

      {/* Signup */}

      <p className="text-center text-sm text-zinc-400">
        Don't have an account?{" "}
        <Link
          to="/signup"
          className="font-semibold text-orange-500 transition hover:text-orange-400"
        >
          Create one
        </Link>
      </p>
    </form>
  );
}