import type { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
}

export function AuthLayout({
  title,
  subtitle,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-[#050505]">
      <div className="grid min-h-screen lg:grid-cols-2">

        {/* Left */}

        <div className="relative hidden overflow-hidden border-r border-white/10 lg:flex">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(249,115,22,.15),transparent_70%)]" />

          <div className="relative flex w-full flex-col justify-between p-14">

            <Link
              to="/"
              className="flex items-center gap-3"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500 font-bold text-black">
                F
              </div>

              <span className="font-['Space_Grotesk'] text-2xl font-bold">
                Forge
              </span>
            </Link>

            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-orange-500">
                Production Engineering
              </p>

              <h1 className="mt-6 font-['Space_Grotesk'] text-6xl font-bold leading-tight">
                Become the Engineer
                <br />
                Companies Actually Hire.
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-8 text-zinc-400">
                Learn by fixing real production systems, debugging failures and
                shipping production-ready solutions.
              </p>
            </div>

            <p className="text-sm text-zinc-500">
              © 2026 Forge
            </p>

          </div>

        </div>

        {/* Right */}

        <div className="flex items-center justify-center px-6 py-12">

          <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/[0.03] p-10 backdrop-blur-xl">

            <h2 className="font-['Space_Grotesk'] text-4xl font-bold">
              {title}
            </h2>

            <p className="mt-3 text-zinc-400">
              {subtitle}
            </p>

            <div className="mt-10">
              {children}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}