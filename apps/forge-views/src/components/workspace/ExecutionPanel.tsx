import {
    PlayCircle,
    Loader2,
    Maximize2,
    Minimize2,
} from "lucide-react";

import type { ExecutionResponse } from "@/types/execution.types";

import { ExecutionSummary } from "./ExecutionSummary";
import { ExecutionStage } from "./ExecutionStage";

interface ExecutionPanelProps {
    result?: ExecutionResponse;
    isExecuting: boolean;

    isFocused: boolean;
    onToggleFocus: () => void;
}

export function ExecutionPanel({
    result,
    isExecuting,
    isFocused,
    onToggleFocus,
}: ExecutionPanelProps) {
    return (
        <div
            className={`border-t border-white/10 bg-[#090909] ${isFocused
                    ? "flex h-full flex-col"
                    : "h-80"
                }`}
        >
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
                <h2 className="text-sm font-semibold tracking-wide text-white">
                    Execution Results
                </h2>

                <div className="flex items-center gap-3">
                    {isExecuting && (
                        <div className="flex items-center gap-2 text-blue-400">
                            <Loader2
                                size={16}
                                className="animate-spin"
                            />

                            <span className="text-sm">
                                Running...
                            </span>
                        </div>
                    )}

                    <button
                        onClick={onToggleFocus}
                        className="rounded-md p-2 text-zinc-400 transition hover:bg-white/10 hover:text-white"
                        title={
                            isFocused
                                ? "Exit Focus Mode"
                                : "Focus Execution Results"
                        }
                    >
                        {isFocused ? (
                            <Minimize2 size={16} />
                        ) : (
                            <Maximize2 size={16} />
                        )}
                    </button>
                </div>
            </div>

            <div className="flex-1 overflow-auto p-6">
                {/* ---------------- EMPTY ---------------- */}

                {!result && !isExecuting && (
                    <div className="flex h-full flex-col items-center justify-center text-center">
                        <PlayCircle
                            size={48}
                            className="mb-4 text-zinc-500"
                        />

                        <h3 className="text-lg font-semibold text-white">
                            Ready to Execute
                        </h3>

                        <p className="mt-2 max-w-lg text-sm text-zinc-500">
                            Run your solution to build the
                            project, execute all test cases,
                            calculate your score, and inspect
                            detailed execution logs.
                        </p>
                    </div>
                )}

                {/* ---------------- RUNNING ---------------- */}

                {isExecuting && (
                    <div className="space-y-5">
                        <div className="flex items-center gap-3">
                            <Loader2
                                className="animate-spin text-blue-500"
                                size={18}
                            />

                            <span className="font-medium text-white">
                                Executing Submission...
                            </span>
                        </div>

                        <div className="space-y-3 rounded-lg border border-white/10 bg-[#111111] p-5 text-white">
                            <p>✓ Saving latest files</p>

                            <p>⏳ Installing dependencies</p>

                            <p>⏳ Building project</p>

                            <p>⏳ Running test cases</p>
                        </div>
                    </div>
                )}

                {/* ---------------- RESULTS ---------------- */}

                {!isExecuting && result && (
                    <div className="space-y-6">
                        <ExecutionSummary
                            result={result}
                        />

                        <ExecutionStage
                            title="INSTALL"
                            result={
                                result.installResult
                            }
                        />

                        <ExecutionStage
                            title="BUILD"
                            result={result.buildResult}
                        />

                        {/* TestResults component will go here */}
                    </div>
                )}
            </div>
        </div>
    );
}