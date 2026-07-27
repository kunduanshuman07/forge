import { motion } from "framer-motion";
import {
  Bug,
  Database,
  ShieldCheck,
  Rocket,
  Cloud,
  Cpu,
} from "lucide-react";

const features = [
  {
    icon: Bug,
    title: "Real Production Bugs",
    description:
      "Debug issues inspired by real production incidents instead of toy coding challenges.",
  },
  {
    icon: ShieldCheck,
    title: "Authentication",
    description:
      "Master JWT, OAuth, sessions, refresh tokens and security best practices.",
  },
  {
    icon: Database,
    title: "Database Systems",
    description:
      "Work with PostgreSQL, Prisma, indexing, transactions and query optimization.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Identify bottlenecks, optimize APIs and build applications that scale.",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    description:
      "Understand Docker, deployments, CI/CD and production infrastructure.",
  },
  {
    icon: Cpu,
    title: "System Design",
    description:
      "Learn architecture, caching, queues and distributed systems through practice.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      className="relative py-22"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            Features
          </p>

          <h2 className="font-['Space_Grotesk'] text-5xl font-bold md:text-6xl">
            Learn Engineering,
            <br />
            Not Just Coding.
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            Forge teaches the skills companies actually expect from software
            engineers.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  delay: index * 0.08,
                }}
                className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-white/[0.05]"
              >
                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500 transition group-hover:scale-110">
                  <Icon size={28} />
                </div>

                <h3 className="font-['Space_Grotesk'] text-2xl font-bold">
                  {feature.title}
                </h3>

                <p className="mt-4 leading-7 text-zinc-400">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}