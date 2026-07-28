import {
    BarChart3,
    Clock3,
    Layers3,
    Trophy,
} from "lucide-react";

const stats = [
    {
        label: "Challenges",
        value: "18",
        icon: Layers3,
    },
    {
        label: "Difficulty",
        value: "Intermediate",
        icon: Trophy,
    },
    {
        label: "Duration",
        value: "12 Hours",
        icon: Clock3,
    },
    {
        label: "Completion",
        value: "42%",
        icon: BarChart3,
    },
];

export function ProjectSummary() {
    return (
        <section className="mb-20 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">

            <div className="grid md:grid-cols-4">

                {stats.map((item, index) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.label}
                            className={`
                                flex items-center gap-5 p-8
                                ${index !== stats.length - 1
                                    ? "border-b border-white/10 md:border-b-0 md:border-r"
                                    : ""
                                }
                            `}
                        >

                            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">

                                <Icon size={26} />

                            </div>

                            <div>

                                <p className="text-sm text-zinc-500">

                                    {item.label}

                                </p>

                                <p className="mt-2 font-['Space_Grotesk'] text-2xl font-bold">

                                    {item.value}

                                </p>

                            </div>

                        </div>

                    );
                })}

            </div>

        </section>
    );
}