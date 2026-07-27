import { motion } from "framer-motion";

const skills = [
  "Authentication",
  "REST APIs",
  "Databases",
  "Docker",
  "Redis",
  "Queues",
  "Kubernetes",
  "Performance",
  "Caching",
  "Memory Leaks",
  "Race Conditions",
  "Scaling",
];

export function LearningGrid() {
  return (
    <section className="py-32">
      <div className="mx-auto max-w-7xl px-6">

        <h2 className="text-center font-['Space_Grotesk'] text-6xl font-bold">
          What You'll Actually Learn
        </h2>

        <p className="mx-auto mt-6 max-w-2xl text-center text-zinc-400">
          Learn engineering concepts that actually appear in production software.
        </p>

        <div className="mt-20 grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          {skills.map((skill, i) => (

            <motion.div
              key={skill}
              initial={{
                opacity: 0,
                y: 30,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: i * 0.05,
              }}
              className="group rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-all duration-300 hover:-translate-y-2 hover:border-orange-500/40 hover:bg-white/[0.05]"
            >
              <h3 className="font-['Space_Grotesk'] text-2xl font-semibold">
                {skill}
              </h3>

              <p className="mt-4 text-zinc-400">
                Production-level debugging missions and practical scenarios.
              </p>
            </motion.div>

          ))}

        </div>

      </div>
    </section>
  );
}