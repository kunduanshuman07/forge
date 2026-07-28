import { motion } from "framer-motion";
import {
    ArrowRight,
    Clock3,
    Flame,
} from "lucide-react";

import { Button } from "@/components/ui/button";

export function ContinueChallenge() {
    return (
        <motion.section
            whileHover={{ y: -4 }}
            transition={{ duration: 0.25 }}
            className="
        group
        relative
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        p-10
        mt-8
        backdrop-blur-xl
      "
        >
            {/* Orange Glow */}

            <div className="absolute -right-24 top-1/2 h-72 w-72 -translate-y-1/2 rounded-full bg-orange-500/10 blur-[120px]" />

            <div className="relative z-10 flex items-center justify-between">

                <div>

                    <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-orange-500/20 bg-orange-500/10 px-4 py-2 text-sm text-orange-400">

                        <Flame size={16} />

                        Continue Challenge

                    </div>

                    <h2 className="font-['Space_Grotesk'] text-4xl font-bold">

                        JWT Authentication Guard

                    </h2>

                    <p className="mt-5 max-w-xl leading-8 text-zinc-400">

                        Continue implementing authentication middleware,
                        secure protected routes and pass all production
                        verification tests.

                    </p>

                    <div className="mt-8 flex items-center gap-8">

                        <div>

                            <p className="text-xs uppercase tracking-widest text-zinc-500">

                                Progress

                            </p>

                            <p className="mt-2 text-lg font-semibold">

                                63%

                            </p>

                        </div>

                        <div>

                            <p className="text-xs uppercase tracking-widest text-zinc-500">

                                Remaining

                            </p>

                            <p className="mt-2 flex items-center gap-2 text-lg font-semibold">

                                <Clock3 size={17} />

                                45 min

                            </p>

                        </div>

                    </div>

                </div>

                <Button
                    size="lg"
                    className="h-14 rounded-2xl px-8"
                >
                    Continue

                    <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

            </div>

        </motion.section>
    );
}