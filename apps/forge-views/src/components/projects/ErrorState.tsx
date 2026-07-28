import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCcw } from "lucide-react";

interface ErrorStateProps {
    title?: string;
    description?: string;
    onRetry?: () => void;
}

export function ErrorState({
    title = "Something went wrong",
    description = "We couldn't load this resource. Please try again.",
    onRetry,
}: ErrorStateProps) {
    return (
        <section className="flex min-h-[450px] items-center justify-center">
            <div className="max-w-lg text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-red-500/20 bg-red-500/10">

                    <AlertTriangle className="h-10 w-10 text-red-400" />

                </div>

                <h2 className="mt-8 font-['Space_Grotesk'] text-4xl font-bold">
                    {title}
                </h2>

                <p className="mt-4 leading-7 text-zinc-400">
                    {description}
                </p>

                {onRetry && (
                    <Button
                        className="mt-10 h-12 rounded-2xl px-8"
                        onClick={onRetry}
                    >
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Try Again
                    </Button>
                )}
            </div>
        </section>
    );
}