import { motion } from "framer-motion";

const stats = [
  {
    value: "1000+",
    label: "Production Bugs",
  },
  {
    value: "50+",
    label: "Tech Stacks",
  },
  {
    value: "500+",
    label: "Engineering Missions",
  },
  {
    value: "24/7",
    label: "Practice",
  },
];

export function Stats() {
  return (
    <section className="border-y border-white/10 bg-white/[0.02] py-12">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-6 text-center lg:grid-cols-4">
        {stats.map((item, i) => (
          <motion.div
            key={item.label}
            initial={{
              opacity: 0,
              y: 20,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              delay: i * 0.15,
            }}
            viewport={{
              once: true,
            }}
          >
            <h2 className="font-['Space_Grotesk'] text-5xl font-bold text-orange-500">
              {item.value}
            </h2>

            <p className="mt-3 text-zinc-400">
              {item.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}