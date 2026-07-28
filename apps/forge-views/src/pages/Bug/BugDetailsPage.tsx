import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { useBug } from "@/hooks/bugs/useBugs";


import { ErrorState } from "@/components/projects/ErrorState";
import { BugDetailsSkeleton } from "@/components/bug/BugDetailsSkeleton";
import { BugDetailsEmptyState } from "@/components/bug/BugDetailsEmptyState";
import { BugOverview } from "@/components/bug/BugOverview";
import { submissionService } from "@/services/submission.service";

export default function BugDetailsPage() {
    const { bugId } = useParams();

    const navigate = useNavigate();

    const [isInitializing, setIsInitializing] = useState(false);
    const [loadingStep, setLoadingStep] = useState("");

    const {
        data: bug,
        isLoading,
        isError,
        refetch,
    } = useBug(bugId!);

    const handleStartInvestigation = async () => {
        if (!bug) return;

        try {
            setIsInitializing(true);

            setLoadingStep("Creating investigation...");

            const { submission } =
                await submissionService.createSubmission(
                    bug.id,
                );

            setLoadingStep("Loading workspace...");

            const {
                data: submissionFiles,
            } = await submissionService.getSubmissionFiles(
                submission.id,
            );

            setLoadingStep("Opening editor...");

            navigate("/workspace", {
                state: {
                    bug,
                    submission,
                    submissionFiles,
                },
            });
        } catch (error) {
            console.error(error);
        } finally {
            setIsInitializing(false);
        }
    };

    if (isLoading) {
        return <BugDetailsSkeleton />;
    }

    if (isError) {
        return (
            <ErrorState
                onRetry={refetch}
            />
        );
    }

    if (!bug) {
        return (
            <BugDetailsEmptyState
                title="Bug Not Found"
                description="The requested bug could not be found."
            />
        );
    }

    if (isInitializing) {
        return (
            <div className="flex h-[70vh] flex-col items-center justify-center gap-6">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-orange-500" />

                <h2 className="font-['Space_Grotesk'] text-3xl font-bold">
                    Initializing Investigation
                </h2>

                <p className="text-zinc-400">
                    {loadingStep}
                </p>
            </div>
        );
    }

    return (
        <BugOverview
            bug={bug}
            onStartInvestigation={handleStartInvestigation}
            isInitializing={isInitializing}
        />
    );
}