import { projectApi } from "@/lib/api";
import type {
    ApiResponse,
} from "@/types/auth.types";

import type {
    CreateProjectDto,
    Project,
    ProjectDetails,
} from "@/types/project.types";

export const projectService = {

    getProjects() {
        return projectApi.get<ApiResponse<Project[]>>("/forge-bug-engine/projects");
    },

    getProject(projectId: string) {
        return projectApi.get<ProjectDetails>(
            `/forge-bug-engine/projects/${projectId}`,
        );
    },

    createProject(data: CreateProjectDto) {
        return projectApi.post<ApiResponse<Project>>(
            "/forge-bug-engine/projects",
            data,
        );
    },

};