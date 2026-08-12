// src/pages/Admin/Bugs/CreateBugPage.tsx

import { useNavigate, useParams } from "react-router-dom";
import { CreateBugForm } from "../../components/admin/CreatBugForm"

export default function CreateBugPage() {
    const navigate = useNavigate();
    const { projectId } = useParams();

    if (!projectId) {
        return null;
    }

    return (
        <CreateBugForm
            projectId={projectId}
            onSuccess={(bug) => {
                navigate(
                    `/admin/projects/${projectId}/bugs/${bug.id}`,
                );
            }}
            onCancel={() => {
                navigate(
                    `/admin/projects/${projectId}`,
                );
            }}
        />
    );
}