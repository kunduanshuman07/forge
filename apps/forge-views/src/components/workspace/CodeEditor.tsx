import Editor from "@monaco-editor/react";

import { useSelectedFile } from "@/stores/workspace.selectors";
import { useWorkspaceStore } from "@/stores/workspace.store";

export function CodeEditor() {
    const selectedFile = useSelectedFile();

    const updateFileContent = useWorkspaceStore(
        (state) => state.updateFileContent
    );

    if (!selectedFile) {
        return (
            <div className="flex mx-auto h-full items-center justify-center text-zinc-500">
                Select a file to start editing
            </div>
        );
    }

    return (
        <div className="flex-1">
            <Editor
                key={selectedFile.id}
                height="100%"
                theme="vs-dark"
                language={selectedFile.language?.toLowerCase() ?? "plaintext"}
                value={selectedFile.content}
                options={{
                    readOnly: !selectedFile.isEditable,

                    automaticLayout: true,

                    fontSize: 14,

                    fontFamily:
                        "'JetBrains Mono', 'Fira Code', monospace",

                    minimap: {
                        enabled: false,
                    },

                    smoothScrolling: true,

                    scrollBeyondLastLine: false,

                    wordWrap: "off",

                    tabSize: 2,

                    renderWhitespace: "selection",

                    cursorBlinking: "smooth",

                    bracketPairColorization: {
                        enabled: true,
                    },

                    guides: {
                        indentation: true,
                    },
                }}
                onChange={(value) =>
                    updateFileContent(
                        selectedFile.id,
                        value ?? ""
                    )
                }
            />
        </div>
    );
}