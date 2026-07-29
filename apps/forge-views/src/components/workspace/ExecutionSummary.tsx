import { CheckCircle2, XCircle, Timer } from "lucide-react";

import type { ExecutionResponse } from "@/types/execution.types";

interface ExecutionSummaryProps {
    result: ExecutionResponse;
}

export function ExecutionSummary({
    result,
}: ExecutionSummaryProps) {
    const passed =
        result.submission.status === "PASSED";

    const passedTests =
        result.testResults?.filter(
            (test) => test.result.exitCode === 0,
        ).length ?? 0;

    const totalTests =
        result.testResults?.length ?? 0;

    return (
        <div className="grid grid-cols-4 gap-4">
            <div className="rounded-lg border border-white/10 bg-[#111111] p-4">
                <p className="text-xs uppercase text-zinc-500">
                    Status
                </p>

                <div className="mt-3 flex items-center gap-2">
                    {passed ? (
                        <CheckCircle2
                            className="text-green-500"
                            size={20}
                        />
                    ) : (
                        <XCircle
                            className="text-red-500"
                            size={20}
                        />
                    )}

                    <span className="font-semibold">
                        {result.submission.status}
                    </span>
                </div>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#111111] p-4">
                <p className="text-xs uppercase text-zinc-500">
                    Score
                </p>

                <p className="mt-3 text-2xl font-bold">
                    {result.score}
                </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#111111] p-4">
                <p className="text-xs uppercase text-zinc-500">
                    Tests
                </p>

                <p className="mt-3 text-2xl font-bold">
                    {passedTests}/{totalTests}
                </p>
            </div>

            <div className="rounded-lg border border-white/10 bg-[#111111] p-4">
                <p className="text-xs uppercase text-zinc-500">
                    Time
                </p>

                <div className="mt-3 flex items-center gap-2">
                    <Timer size={18} />

                    <span className="font-semibold">
                        {(
                            result.executionTimeMs /
                            1000
                        ).toFixed(2)}
                        s
                    </span>
                </div>
            </div>
        </div>
    );
}