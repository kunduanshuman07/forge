// src/pages/Admin/BugSnapshots/CreateBugSnapshotPage.tsx

import { CreateBugSnapshotForm } from "@/components/admin/CreateBugSnapshotForm";
import { useNavigate, useParams } from "react-router-dom";


export default function CreateBugSnapshotPage() {
    const navigate = useNavigate();

    const {
        projectId,
        bugId,
    } = useParams();

    if (!projectId || !bugId) {
        return null;
    }

    return (
        <CreateBugSnapshotForm
            projectId={projectId}
            bugId={bugId}
            onSuccess={() => {
                navigate(
                    `/admin/projects/${projectId}/bugs/${bugId}/snapshots/new`,
                );
            }}
        />
    );
}