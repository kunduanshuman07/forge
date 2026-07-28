import { useNavigate } from "react-router-dom";
import { ProjectCard } from "./ProjectCard";
import type { Project } from "@/types/project.types";

interface ProjectGridProps {
    projects: Project[];
}

export function ProjectGrid(props: ProjectGridProps) {
    const navigate = useNavigate();
    console.log(props.projects);
    return (
        <div className="grid gap-8 lg:grid-cols-2">

            {props?.projects?.map((project: any) => (

                <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() =>
                        navigate(`/projects/${project.id}`)
                    }
                />

            ))}

        </div>
    );
}