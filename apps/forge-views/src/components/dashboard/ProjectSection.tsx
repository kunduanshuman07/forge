import { motion } from "framer-motion";
import {
    ArrowRight,
    Boxes,
    Bug,
    Cpu,
} from "lucide-react";

const projects = [
    {
        id: 1,
        title: "Authentication Service",
        description: "JWT, OAuth, RBAC and enterprise authentication.",
        icon: Boxes,
        bugs: 18,
        progress: 42,
    },
    {
        id: 2,
        title: "Bug Engine",
        description: "Real production debugging challenges.",
        icon: Bug,
        bugs: 24,
        progress: 15,
    },
    {
        id: 3,
        title: "Execution Engine",
        description: "Compilation, execution and automated testing.",
        icon: Cpu,
        bugs: 12,
        progress: 80,
    },
];

export function ProjectsSection() {
    return (
        <section className="mt-20">

            <div className="mb-8 flex items-end justify-between">

                <div>

                    <p className="text-orange-400">
                        Projects
                    </p>

                    <h2 className="mt-2 font-['Space_Grotesk'] text-4xl font-bold">
                        Engineering Workspaces
                    </h2>

                </div>

            </div>

            <div className="grid gap-6 lg:grid-cols-3">

                {projects.map((project) => {

                    const Icon = project.icon;

                    return (

                        <motion.div
                            key={project.id}
                            whileHover={{
                                y: -6,
                            }}
                            transition={{
                                duration: .25,
                            }}
                            className="
                group
                relative
                overflow-hidden
                rounded-3xl
                border
                border-white/10
                bg-white/[0.04]
                p-7
                backdrop-blur-xl
                cursor-pointer
              "
                        >

                            {/* Glow */}

                            <div className="absolute right-0 top-0 h-44 w-44 rounded-full bg-orange-500/10 blur-[100px] opacity-0 transition duration-500 group-hover:opacity-100" />

                            <div className="relative z-10">

                                <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">

                                    <Icon size={28} />

                                </div>

                                <h3 className="font-['Space_Grotesk'] text-2xl font-semibold">

                                    {project.title}

                                </h3>

                                <p className="mt-3 leading-7 text-zinc-400">

                                    {project.description}

                                </p>

                                <div className="mt-8">

                                    <div className="mb-2 flex justify-between text-sm">

                                        <span className="text-zinc-500">
                                            Progress
                                        </span>

                                        <span>
                                            {project.progress}%
                                        </span>

                                    </div>

                                    <div className="h-2 rounded-full bg-white/10">

                                        <div
                                            style={{
                                                width: `${project.progress}%`,
                                            }}
                                            className="h-full rounded-full bg-orange-500"
                                        />

                                    </div>

                                </div>

                                <div className="mt-8 flex items-center justify-between">

                                    <p className="text-sm text-zinc-500">

                                        {project.bugs} Challenges

                                    </p>

                                    <ArrowRight
                                        size={20}
                                        className="transition group-hover:translate-x-1"
                                    />

                                </div>

                            </div>

                        </motion.div>

                    );
                })}

            </div>

        </section>
    );
}