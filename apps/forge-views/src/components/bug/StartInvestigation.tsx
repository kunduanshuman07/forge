import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export function StartInvestigation() {
    const navigate = useNavigate();

    return (
        <section className="pb-20">

            <div className="rounded-3xl border border-orange-500/10 bg-gradient-to-r from-orange-500/10 via-transparent to-transparent p-10">

                <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">

                    <div>

                        <h2 className="font-['Space_Grotesk'] text-4xl font-bold">

                            Ready to investigate?

                        </h2>

                        <p className="mt-4 max-w-2xl text-zinc-400">

                            A new workspace will be created from the latest
                            snapshot and your submission will be tracked from
                            the moment you start solving this challenge.

                        </p>

                    </div>

                    <Button
                        size="lg"
                        className="h-14 rounded-2xl px-8"
                        onClick={() => navigate("/workspace/submission-id")}
                    >
                        Start Investigation

                        <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>

                </div>

            </div>

        </section>
    );
}