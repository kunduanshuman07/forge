import { useParams } from "react-router-dom";

import { useBugs } from "@/hooks/bugs/useBugs";

import { EmptyProjects } from "@/components/projects/EmptyProjects";
import { BugRoadmap } from "@/components/project-detail/BugRoadmap";
import { ProjectHero } from "@/components/project-detail/ProjectHero";
import { ErrorState } from "@/components/projects/ErrorState";
import { ProjectDetailsSkeleton } from "@/components/project-detail/ProjectDetailsSkeleton";


export default function ProjectDetailsPage() {
    const { projectId } = useParams();

    const {
        data,
        isLoading,
        isError,
        refetch,
    } = useBugs(projectId!);

    if (isLoading) {
        return <ProjectDetailsSkeleton />;
    }

    if (isError) {
        return (
            <ErrorState
                onRetry={refetch}
            />
        );
    }

    if (!data?.data.length) {
        return (
            <EmptyProjects />
        );
    }

    return (
        <section className="px-8 py-12">

            <div className="mx-auto max-w-7xl">

                <ProjectHero />

                <BugRoadmap
                    bugs={data.data}
                />

            </div>

        </section>
    );
}