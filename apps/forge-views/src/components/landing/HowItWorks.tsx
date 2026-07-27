import { motion } from "framer-motion";
import {
  Search,
  Bug,
  Wrench,
  Trophy,
} from "lucide-react";

const steps = [
  {
    icon: Search,
    title: "Choose a Mission",
    description:
      "Browse production-inspired engineering challenges across multiple domains.",
  },
  {
    icon: Bug,
    title: "Investigate",
    description:
      "Read logs, inspect code, reproduce bugs and understand the root cause.",
  },
  {
    icon: Wrench,
    title: "Ship the Fix",
    description:
      "Implement the solution, verify the behavior and complete the mission.",
  },
  {
    icon: Trophy,
    title: "Earn XP",
    description:
      "Unlock achievements, level up and build your engineering profile.",
  },
];

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative py-32"
    >
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-orange-500">
            How It Works
          </p>

          <h2 className="font-['Space_Grotesk'] text-5xl font-bold md:text-6xl">
            Learn Like
            <br />
            A Real Engineer.
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            Every mission follows the same workflow used by professional
            engineering teams.
          </p>
        </motion.div>

        <div className="relative mt-24">

          {/* Timeline */}

          <div className="absolute left-1/2 top-14 hidden h-[calc(100%-56px)] w-px -translate-x-1/2 bg-gradient-to-b from-orange-500 via-orange-400/40 to-transparent lg:block" />

          <div className="space-y-16">
            {steps.map((step, index) => {
              const Icon = step.icon;

              const reverse = index % 2 !== 0;

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.12 }}
                  className={`grid items-center gap-10 lg:grid-cols-2 ${
                    reverse ? "lg:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div>
                    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition duration-300 hover:border-orange-500/40 hover:bg-white/[0.05]">
                      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-500/10 text-orange-500">
                        <Icon size={30} />
                      </div>

                      <h3 className="font-['Space_Grotesk'] text-3xl font-bold">
                        {step.title}
                      </h3>

                      <p className="mt-4 leading-8 text-zinc-400">
                        {step.description}
                      </p>
                    </div>
                  </div>

                  <div className="hidden items-center justify-center lg:flex">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-orange-500/30 bg-orange-500/10 text-2xl font-bold text-orange-500 shadow-[0_0_40px_rgba(249,115,22,.2)]">
                      {index + 1}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}