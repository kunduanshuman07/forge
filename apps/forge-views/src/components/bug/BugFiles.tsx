import {
    FileCode2,
    FolderOpen,
} from "lucide-react";

const files = [
    "src/auth/jwt.guard.ts",
    "src/auth/jwt.strategy.ts",
    "src/auth/auth.module.ts",
    "src/auth/auth.service.ts",
    "src/main.ts",
    "test/jwt.guard.spec.ts",
];

export function BugFiles() {
    return (
        <section className="mb-16">

            <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-10 backdrop-blur-xl">

                <div className="mb-8 flex items-center gap-3">

                    <FolderOpen
                        className="text-orange-400"
                    />

                    <h2 className="font-['Space_Grotesk'] text-3xl font-bold">

                        Workspace Files

                    </h2>

                </div>

                <div className="space-y-3">

                    {files.map((file) => (

                        <div
                            key={file}
                            className="flex items-center gap-4 rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4 transition hover:border-orange-500/20"
                        >

                            <FileCode2
                                size={18}
                                className="text-orange-400"
                            />

                            <span className="font-mono text-sm text-zinc-300">

                                {file}

                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}