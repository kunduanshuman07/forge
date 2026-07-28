import type { Project } from "@/types/project.types";
import { motion } from "framer-motion";
import {
    ArrowRight,
    Clock3,
    Code2,
    Layers3,
} from "lucide-react";

interface ProjectCardProps {
    project: Project;
    onClick?: () => void;
}

export function ProjectCard({
    project,
    onClick,
}: ProjectCardProps) {
    return (
        <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            onClick={onClick}
            className="
        group
        relative
        cursor-pointer
        overflow-hidden
        rounded-3xl
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        transition-all
        hover:border-orange-500/20
      "
        >
            {/* Banner */}

            {project.bannerUrl ? (
                <img
                    src={project.bannerUrl}
                    alt={project.title}
                    className="h-44 w-full object-cover"
                />
            ) : (
                <div className="flex h-44 items-center justify-center bg-gradient-to-br from-orange-500/10 to-transparent">
                    <Layers3
                        size={60}
                        className="text-orange-400"
                    />
                </div>
            )}

            <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-orange-500/10 blur-[120px] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            <div className="relative z-10 p-8">

                <span className="inline-flex rounded-full border border-orange-500/20 bg-orange-500/10 px-3 py-1 text-xs uppercase tracking-wider text-orange-400">
                    {project.category}
                </span>

                <h3 className="mt-5 font-['Space_Grotesk'] text-3xl font-bold">
                    {project.title}
                </h3>

                <p className="mt-4 line-clamp-3 leading-7 text-zinc-400">
                    {project.shortDescription}
                </p>

                <div className="mt-8 grid grid-cols-2 gap-6">

                    <div>
                        <p className="text-xs uppercase tracking-widest text-zinc-500">
                            Language
                        </p>

                        <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
                            <Code2 size={18} />
                            {project.language}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs uppercase tracking-widest text-zinc-500">
                            Duration
                        </p>

                        <p className="mt-2 flex items-center gap-2 text-lg font-semibold">
                            <Clock3 size={18} />
                            {project.estimatedHours} hrs
                        </p>
                    </div>

                </div>

                <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-6">

                    <div>
                        <p className="text-xs uppercase tracking-widest text-zinc-500">
                            Framework
                        </p>

                        <p className="mt-1 font-medium">
                            {project.framework}
                        </p>
                    </div>

                    <ArrowRight className="transition duration-300 group-hover:translate-x-2 group-hover:text-orange-400" />

                </div>

            </div>
        </motion.div>
    );
}