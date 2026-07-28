import { ContinueChallenge } from "@/components/dashboard/ContinueChallenge";
import { ProjectsSection } from "@/components/dashboard/ProjectSection";
import { RecentActivity } from "@/components/dashboard/RecentActivity";

export default function DashboardPage() {
  return (
    <section className="px-8 py-12">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4">
          <p className="text-orange-400">
            Welcome Back
          </p>

          <h1 className="font-['Space_Grotesk'] text-6xl font-bold tracking-tight">
            What are we building today?
          </h1>

          <p className="max-w-2xl text-lg text-zinc-400">
            Continue solving production-grade engineering problems
            and master real software systems.
          </p>
        </div>
        <ContinueChallenge />
        <ProjectsSection />
        <RecentActivity />
      </div>
    </section>
  );
}