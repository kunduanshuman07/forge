import { TestTube2 } from "lucide-react";

import type { TestCaseExecution } from "@/types/execution.types";

import { TestResultItem } from "./TestResultItem";

interface TestResultsProps {
    tests?: TestCaseExecution[];
}

export function TestResults({
    tests = [],
}: TestResultsProps) {
    if (tests.length === 0) {
        return (
            <div className="rounded-lg border border-white/10 bg-[#111111] p-6">
                <div className="flex items-center gap-3">
                    <TestTube2
                        size={20}
                        className="text-zinc-400"
                    />

                    <div>
                        <h3 className="font-medium text-white">
                            Test Results
                        </h3>

                        <p className="text-sm text-zinc-500">
                            No test cases were executed.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const passedCount = tests.filter(
        (t) => t.result.exitCode === 0
    ).length;

    const failedCount = tests.length - passedCount;

    return (
        <div className="space-y-4">
            {/* Header */}

            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <TestTube2
                        size={18}
                        className="text-white"
                    />

                    <h2 className="text-sm font-semibold tracking-wide text-white">
                        Test Results
                    </h2>
                </div>

                <div className="flex items-center gap-2">
                    <span className="rounded-full bg-green-500/15 px-2 py-1 text-xs font-medium text-green-400">
                        {passedCount} Passed
                    </span>

                    {failedCount > 0 && (
                        <span className="rounded-full bg-red-500/15 px-2 py-1 text-xs font-medium text-red-400">
                            {failedCount} Failed
                        </span>
                    )}
                </div>
            </div>

            {/* Tests */}

            <div className="space-y-3">
                {tests
                    .sort(
                        (a, b) =>
                            a.testCase.displayOrder -
                            b.testCase.displayOrder
                    )
                    .map((test) => (
                        <TestResultItem
                            key={test.testCase.id}
                            test={test}
                        />
                    ))}
            </div>
        </div>
    );
}