import type { Bug } from "@/types/bug.types";

import { motion } from "framer-motion";

import {
    ArrowRight,
    Clock3,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

interface BugRoadmapProps {
    bugs: Bug[];
}

export function BugRoadmap({
    bugs,
}: BugRoadmapProps) {

    const navigate = useNavigate();

    const sortedBugs = [...bugs].sort(
        (a, b) => a.displayOrder - b.displayOrder,
    );

    return (
        <section>

            <div className="mb-8">

                <p className="text-orange-400">
                    Learning Roadmap
                </p>

                <h2 className="mt-2 font-['Space_Grotesk'] text-4xl font-bold">
                    Production Bugs
                </h2>

            </div>

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">

                {sortedBugs.map((bug, index) => (

                    <motion.button
                        key={bug.id}
                        whileHover={{
                            backgroundColor: "rgba(255,255,255,.02)",
                        }}
                        onClick={() =>
                            navigate(`/bugs/${bug.id}`)
                        }
                        className={`
                            group
                            flex
                            w-full
                            items-center
                            justify-between
                            px-8
                            py-6
                            text-left
                            transition

                            ${index !== sortedBugs.length - 1
                                ? "border-b border-white/10"
                                : ""
                            }
                        `}
                    >

                        <div className="flex items-center gap-5">

                            <div className="h-3 w-3 rounded-full bg-orange-500" />

                            <div>

                                <h3 className="text-lg font-semibold">

                                    {bug.title}

                                </h3>

                                <div className="mt-2 flex items-center gap-5 text-sm text-zinc-500">

                                    <span>

                                        {bug.difficulty}

                                    </span>

                                    <span className="flex items-center gap-2">

                                        <Clock3 size={14} />

                                        {bug.estimatedMinutes} mins

                                    </span>

                                    <span>

                                        {bug.points} XP

                                    </span>

                                </div>

                            </div>

                        </div>

                        <ArrowRight
                            size={18}
                            className="transition group-hover:translate-x-1 group-hover:text-orange-400"
                        />

                    </motion.button>

                ))}

            </div>

        </section>
    );
}