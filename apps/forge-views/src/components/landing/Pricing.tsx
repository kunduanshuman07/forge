import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const plans = [
  {
    name: "Starter",
    price: "₹0",
    subtitle: "Perfect for getting started",
    highlighted: false,
    features: [
      "20 Practice Missions",
      "Basic XP System",
      "Community Access",
      "Public Leaderboard",
    ],
  },
  {
    name: "Pro",
    price: "₹999",
    duration: "/month",
    subtitle: "For serious engineers",
    highlighted: true,
    features: [
      "Unlimited Missions",
      "Advanced Bug Engine",
      "AI Mentor",
      "Certificates",
      "Priority Support",
      "Early Access Features",
    ],
  },
  {
    name: "Teams",
    price: "Custom",
    subtitle: "For companies & colleges",
    highlighted: false,
    features: [
      "Unlimited Seats",
      "Interview Mode",
      "Progress Dashboard",
      "Analytics",
      "Admin Panel",
      "Priority Support",
    ],
  },
];

export function Pricing() {
  return (
    <section
      id="pricing"
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
            Pricing
          </p>

          <h2 className="font-['Space_Grotesk'] text-5xl font-bold md:text-6xl">
            Simple Pricing.
            <br />
            No Surprises.
          </h2>

          <p className="mt-6 text-lg text-zinc-400">
            Start free and upgrade whenever you're ready.
          </p>
        </motion.div>

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              className={`relative rounded-3xl border p-8 transition-all duration-300 hover:-translate-y-2 ${
                plan.highlighted
                  ? "border-orange-500 bg-orange-500/5 shadow-[0_0_60px_rgba(249,115,22,.15)]"
                  : "border-white/10 bg-white/[0.03]"
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 rounded-full bg-orange-500 px-4 py-1 text-sm font-semibold text-black">
                  MOST POPULAR
                </div>
              )}

              <h3 className="font-['Space_Grotesk'] text-3xl font-bold">
                {plan.name}
              </h3>

              <p className="mt-3 text-zinc-400">
                {plan.subtitle}
              </p>

              <div className="mt-8 flex items-end gap-1">
                <span className="font-['Space_Grotesk'] text-5xl font-bold">
                  {plan.price}
                </span>

                {plan.duration && (
                  <span className="pb-2 text-zinc-500">
                    {plan.duration}
                  </span>
                )}
              </div>

              <div className="my-8 h-px bg-white/10" />

              <ul className="space-y-4">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-3"
                  >
                    <Check
                      size={18}
                      className="mt-1 text-orange-500"
                    />

                    <span className="text-zinc-300">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className="mt-10 w-full h-12 rounded-xl"
                variant={plan.highlighted ? "default" : "outline"}
              >
                {plan.name === "Teams"
                  ? "Contact Sales"
                  : "Choose Plan"}
              </Button>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}