import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeEditor } from "./CodeEditor";
import { ArrowRight } from "lucide-react";

const bugCode = `const user = await getUser(userId);

const profile = await getProfile(user.id);

console.log(profile.name);

❌ TypeError:
Cannot read properties of undefined

Mission:
Find the root cause.
Deploy the fix.`;

export function BugEnginePanel() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-white/10 bg-[#0A0A0A] shadow-[0_40px_100px_rgba(0,0,0,.45)]">

      {/* Top Bar */}

      <div className="flex items-center justify-between border-b border-white/10 bg-white/[0.02] px-6 py-4">

        <div className="flex items-center gap-2">

          <div className="h-3 w-3 rounded-full bg-red-500" />

          <div className="h-3 w-3 rounded-full bg-yellow-500" />

          <div className="h-3 w-3 rounded-full bg-green-500" />

        </div>

        <div className="font-mono text-sm text-zinc-500">
          bug-engine.ts
        </div>

        <Badge className="bg-emerald-500/15 text-emerald-400 border-emerald-500/20">
          LIVE
        </Badge>

      </div>

      {/* Body */}

      <div className="grid lg:grid-cols-[2.2fr_1fr]">

        {/* Editor */}

        <div className="relative border-r border-white/10">

          {/* Line Numbers */}

          <div className="absolute left-0 top-0 flex h-full w-14 flex-col items-end gap-2 border-r border-white/5 bg-white/[0.02] pt-8 pr-4 font-mono text-sm text-zinc-600">

            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}

          </div>

          <div className="pl-20 pr-8 py-8">

            <CodeEditor code={bugCode} />

          </div>

        </div>

        {/* Right Panel */}

        <div className="space-y-4 p-6">

          <div className="rounded-2xl border border-orange-500/20 bg-orange-500/5 p-5">

            <p className="text-sm text-zinc-500">
              Mission
            </p>

            <h3 className="mt-2 text-xl font-semibold">
              Fix Production Bug
            </h3>

          </div>

          <div className="grid grid-cols-2 gap-4">

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-zinc-500">
                Difficulty
              </p>

              <h4 className="mt-2 font-semibold">
                Medium
              </h4>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-zinc-500">
                XP
              </p>

              <h4 className="mt-2 font-semibold text-orange-400">
                +250
              </h4>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-zinc-500">
                Stack
              </p>

              <h4 className="mt-2 font-semibold">
                Node.js
              </h4>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="text-xs text-zinc-500">
                Time
              </p>

              <h4 className="mt-2 font-semibold">
                18 min
              </h4>
            </div>

          </div>

          <Button className="mt-3 h-14 w-full rounded-2xl text-base">
            Solve Mission

            <ArrowRight className="ml-2 h-5 w-5" />

          </Button>

        </div>

      </div>

    </div>
  );
}