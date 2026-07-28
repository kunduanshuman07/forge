import { buildFileTree } from "@/utils/build-file-tree";

import { FileTree } from "./FileTree";
import { useWorkspaceFiles } from "@/stores/workspace.selectors";

export function FileExplorer() {
    const files = useWorkspaceFiles();

    const tree = buildFileTree(files);

    return (
        <aside className="w-72 overflow-y-auto border-r border-white/10 bg-[#0f0f0f] p-4">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-zinc-400">
                Explorer
            </h2>

            <FileTree nodes={tree} />
        </aside>
    );
}