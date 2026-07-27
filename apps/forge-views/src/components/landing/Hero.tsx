import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/layout/Container";
import { BugEnginePanel } from "./BugEnginePanel";

export function Hero() {

    return (
        <section className="relative overflow-hidden pt-26 pb-24">

            {/* Background Glow */}
            <div className="absolute left-1/2 top-40 h-[450px] w-[450px] -translate-x-1/2 rounded-full bg-orange-500/15 blur-[180px]" />

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage: `
          linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)
        `,
                    backgroundSize: "60px 60px",
                }}
            />

            <Container>

                <div className="mx-auto max-w-5xl text-center">

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                    >

                        <Badge className="mb-8 rounded-full px-5 py-2">
                            🚀 Production Engineering Platform
                        </Badge>

                        <h1 className="font-['Space_Grotesk'] text-6xl font-bold leading-[1.05] md:text-8xl">

                            Become the Engineer

                            <span className="mt-2 block text-orange-500">

                                Companies Actually Hire.

                            </span>

                        </h1>

                        <p className="mx-auto mt-8 max-w-3xl text-xl leading-9 text-zinc-400">

                            Stop solving toy coding questions.

                            Learn debugging, production systems and software
                            architecture by fixing real engineering problems.

                        </p>

                        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">

                            <Button
                                size="lg"
                                className="h-14 rounded-2xl px-8 text-base"
                            >
                                Start Forging

                                <ArrowRight className="ml-2 h-5 w-5" />

                            </Button>

                            <Button
                                variant="outline"
                                size="lg"
                                className="h-14 rounded-2xl px-8 text-base"
                            >

                                <Play className="mr-2 h-5 w-5" />

                                Watch Demo

                            </Button>

                        </div>

                    </motion.div>

                    {/* BUG ENGINE */}

                    <motion.div
                        initial={{ opacity: 0, y: 60 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: .25 }}
                        className="mt-24"
                    >

                        <BugEnginePanel />

                    </motion.div>

                </div>

            </Container>

        </section>
    );
}