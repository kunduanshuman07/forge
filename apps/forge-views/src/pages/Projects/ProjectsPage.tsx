import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { ErrorState } from "@/components/projects/ErrorState";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ProjectsHero } from "@/components/projects/ProjectsHero";
import { ProjectsSkeleton } from "@/components/projects/ProjectsSkeleton";
import { useProjects } from "@/hooks/projects/useProjects";

export default function ProjectsPage() {
  const {
    data: projects,
    isLoading,
    isError,
  } = useProjects();
  if (isLoading) {
    return <ProjectsSkeleton />;
  }

  if (isError) {
    return <ErrorState />;
  }

  if (!projects?.length) {
    return <EmptyProjects />;
  }
  return (
    <section className="px-8 py-12">

      <div className="mx-auto max-w-7xl">

        <ProjectsHero />

        <ProjectGrid projects={projects} />

      </div>

    </section>
  );
}