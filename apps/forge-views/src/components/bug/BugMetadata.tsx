import {
    Award,
    Clock3,
    FlaskConical,
    Gauge,
} from "lucide-react";

const metadata = [
    {
        label: "Difficulty",
        value: "Intermediate",
        icon: Gauge,
    },
    {
        label: "Estimated Time",
        value: "30 Minutes",
        icon: Clock3,
    },
    {
        label: "Points",
        value: "100 XP",
        icon: Award,
    },
    {
        label: "Tests",
        value: "8",
        icon: FlaskConical,
    },
];

export function BugMetadata() {
    return (
        <section className="mb-16">

            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl">

                <div className="grid md:grid-cols-4">

                    {metadata.map((item, index) => {

                        const Icon = item.icon;

                        return (

                            <div
                                key={item.label}
                                className={`flex items-center gap-5 p-8 ${index !== metadata.length - 1
                                        ? "border-b border-white/10 md:border-b-0 md:border-r"
                                        : ""
                                    }`}
                            >

                                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-400">

                                    <Icon size={24} />

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

            </div>

        </section>
    );
}