import {
    CheckCircle2,
    Circle,
    Loader2,
} from "lucide-react";

type ExecutionStep = "INSTALL" | "BUILD" | "TEST";

interface ExecutionTimelineProps {
    currentStep: ExecutionStep;
}

const stages = [
    {
        id: "SAVE",
        label: "Save Workspace",
    },
    {
        id: "INSTALL",
        label: "Install Dependencies",
    },
    {
        id: "BUILD",
        label: "Build Project",
    },
    {
        id: "TEST",
        label: "Execute Test Cases",
    },
] as const;

export function ExecutionTimeline({
    currentStep,
}: ExecutionTimelineProps) {
    const currentIndex = stages.findIndex(
        (stage) => stage.id === currentStep
    );

    return (
        <div className="rounded-lg border border-white/10 bg-[#111111] p-5">
            <h3 className="mb-5 text-sm font-semibold tracking-wide text-white">
                Execution Pipeline
            </h3>

            <div className="space-y-4">
                {stages.map((stage, index) => {
                    const completed =
                        stage.id === "SAVE"
                            ? currentIndex >= 0
                            : index - 1 < currentIndex;

                    const current =
                        stage.id === currentStep;

                    return (
                        <div
                            key={stage.id}
                            className="flex items-center gap-3"
                        >
                            {completed && !current && (
                                <CheckCircle2
                                    size={18}
                                    className="text-green-500"
                                />
                            )}

                            {current && (
                                <Loader2
                                    size={18}
                                    className="animate-spin text-blue-500"
                                />
                            )}

                            {!completed &&
                                !current && (
                                    <Circle
                                        size={18}
                                        className="text-zinc-600"
                                    />
                                )}

                            <span
                                className={
                                    completed ||
                                        current
                                        ? "text-white"
                                        : "text-zinc-500"
                                }
                            >
                                {stage.label}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}