import { useState } from "react";
import {
    ChevronDown,
    ChevronRight,
    CheckCircle2,
    XCircle,
    Terminal,
} from "lucide-react";

import type { TestCaseExecution } from "@/types/execution.types";

interface TestResultItemProps {
    test: TestCaseExecution;
}

export function TestResultItem({
    test,
}: TestResultItemProps) {
    const [expanded, setExpanded] = useState(
        test.result.exitCode !== 0
    );

    const passed = test.result.exitCode === 0;

    return (
        <div className="overflow-hidden rounded-lg border border-white/10 bg-[#111111]">
            <button
                onClick={() =>
                    setExpanded(!expanded)
                }
                className="flex w-full items-center justify-between px-4 py-3 transition hover:bg-white/5"
            >
                <div className="flex items-center gap-3">
                    {expanded ? (
                        <ChevronDown
                            size={16}
                            className="text-zinc-400"
                        />
                    ) : (
                        <ChevronRight
                            size={16}
                            className="text-zinc-400"
                        />
                    )}

                    {passed ? (
                        <CheckCircle2
                            size={18}
                            className="text-green-500"
                        />
                    ) : (
                        <XCircle
                            size={18}
                            className="text-red-500"
                        />
                    )}

                    <div className="text-left">
                        <p className="font-medium text-white">
                            {test.testCase.name}
                        </p>

                        <p className="text-xs text-zinc-500">
                            {test.testCase.description}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <span
                        className={`rounded-full px-2 py-1 text-xs font-medium ${passed
                                ? "bg-green-500/15 text-green-400"
                                : "bg-red-500/15 text-red-400"
                            }`}
                    >
                        {passed
                            ? "PASSED"
                            : "FAILED"}
                    </span>

                    <span className="text-xs text-zinc-500">
                        {
                            test.result
                                .executionTimeMs
                        }
                        ms
                    </span>
                </div>
            </button>

            {expanded && (
                <div className="space-y-5 border-t border-white/10 px-5 py-5">
                    <div className="grid gap-4 md:grid-cols-2">
                        <Info
                            label="Command"
                            value={
                                test.testCase.command
                            }
                        />

                        <Info
                            label="Expected Output"
                            value={
                                test.testCase
                                    .expectedOutput
                            }
                        />

                        <Info
                            label="Exit Code"
                            value={String(
                                test.result
                                    .exitCode
                            )}
                        />

                        <Info
                            label="Execution Time"
                            value={`${test.result.executionTimeMs} ms`}
                        />
                    </div>

                    <ConsoleOutput
                        title="STDOUT"
                        value={
                            test.result.stdout ||
                            "Nothing printed."
                        }
                    />

                    <ConsoleOutput
                        title="STDERR"
                        value={
                            test.result.stderr ||
                            "Nothing printed."
                        }
                    />
                </div>
            )}
        </div>
    );
}

function Info({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div>
            <p className="mb-1 text-xs uppercase tracking-wide text-zinc-500">
                {label}
            </p>

            <p className="font-mono text-sm text-white">
                {value}
            </p>
        </div>
    );
}

function ConsoleOutput({
    title,
    value,
}: {
    title: string;
    value: string;
}) {
    return (
        <div>
            <div className="mb-2 flex items-center gap-2 text-sm font-medium text-white">
                <Terminal size={15} />

                {title}
            </div>

            <pre className="overflow-auto rounded-md border border-white/10 bg-[#090909] p-4 text-xs leading-6 text-zinc-300">
                {value}
            </pre>
        </div>
    );
}