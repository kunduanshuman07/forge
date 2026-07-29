import {
    CheckCircle2,
    XCircle,
} from "lucide-react";

import type { CommandResult } from "@/types/execution.types";

interface ExecutionStageProps {
    title: string;
    result?: CommandResult;
}

export function ExecutionStage({
    title,
    result,
}: ExecutionStageProps) {
    if (!result) {
        return null;
    }

    const success = result.exitCode === 0;

    return (
        <div className="rounded-lg border border-white/10 bg-[#111111] p-5">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    {success ? (
                        <CheckCircle2
                            className="text-green-500"
                            size={18}
                        />
                    ) : (
                        <XCircle
                            className="text-red-500"
                            size={18}
                        />
                    )}

                    <h3 className="font-semibold">
                        {title}
                    </h3>
                </div>

                <span className="text-sm text-zinc-500">
                    {result.executionTimeMs} ms
                </span>
            </div>

            {(result.stdout ||
                result.stderr) && (
                    <pre className="mt-4 overflow-auto rounded bg-black/40 p-3 text-xs text-zinc-300">
                        {result.stdout ||
                            result.stderr}
                    </pre>
                )}
        </div>
    );
}