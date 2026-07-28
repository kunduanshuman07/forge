import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock3,
    PlayCircle,
} from "lucide-react";

const activities = [
    {
        id: 1,
        title: "JWT Authentication Guard",
        subtitle: "Challenge Completed",
        status: "completed",
        time: "2 hours ago",
    },
    {
        id: 2,
        title: "OAuth Refresh Token",
        subtitle: "Currently In Progress",
        status: "running",
        time: "Yesterday",
    },
    {
        id: 3,
        title: "Role Based Access Control",
        subtitle: "Challenge Unlocked",
        status: "pending",
        time: "2 days ago",
    },
];

export function RecentActivity() {
    return (
        <section className="mt-20">

            <div className="mb-10">

                <p className="text-orange-400">
                    Activity
                </p>

                <h2 className="mt-2 font-['Space_Grotesk'] text-4xl font-bold">
                    Engineering Timeline
                </h2>

            </div>

            <div className="relative ml-4 border-l border-white/10">

                {activities.map((activity, index) => {

                    const Icon =
                        activity.status === "completed"
                            ? CheckCircle2
                            : activity.status === "running"
                                ? PlayCircle
                                : Clock3;

                    const color =
                        activity.status === "completed"
                            ? "text-green-400"
                            : activity.status === "running"
                                ? "text-orange-400"
                                : "text-zinc-500";

                    return (
                        <motion.div
                            key={activity.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                delay: index * 0.08,
                            }}
                            className="relative pb-10 pl-10"
                        >

                            <div
                                className={`
                  absolute
                  -left-[18px]
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/10
                  bg-[#111]
                  ${color}
                `}
                            >
                                <Icon size={18} />
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">

                                <div className="flex items-center justify-between">

                                    <div>

                                        <h3 className="font-semibold text-lg">

                                            {activity.title}

                                        </h3>

                                        <p className="mt-2 text-zinc-400">

                                            {activity.subtitle}

                                        </p>

                                    </div>

                                    <span className="text-sm text-zinc-500">

                                        {activity.time}

                                    </span>

                                </div>

                            </div>

                        </motion.div>
                    );
                })}

            </div>

        </section>
    );
}