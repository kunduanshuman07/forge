import type { FileType, ProgrammingLanguage } from "@/types/snapshot-file.types";

const excludedDirectories = [
    "node_modules",
    ".git",
    "dist",
    "build",
    "coverage",
    ".next",
    ".turbo",
];

const excludedFiles = [
    ".env",
    ".env.local",
    ".env.development",
    ".env.production",
    ".DS_Store",
];

const languageByExtension: Record<
    string,
    ProgrammingLanguage
> = {
    ts: "TYPESCRIPT",
    tsx: "TYPESCRIPT",
    js: "JAVASCRIPT",
    jsx: "JAVASCRIPT",
    py: "PYTHON",
    java: "JAVA",
    go: "GO",
    rs: "RUST",
};

const sourceExtensions = [
    "ts",
    "tsx",
    "js",
    "jsx",
    "py",
    "java",
    "go",
    "rs",
];

const testPatterns = [
    ".test.",
    ".spec.",
];

const configFiles = [
    "package.json",
    "package-lock.json",
    "yarn.lock",
    "pnpm-lock.yaml",
    "tsconfig.json",
    "nest-cli.json",
    "vite.config.ts",
    "vite.config.js",
];

const documentationFiles = [
    "README.md",
];

export function getRelativePath(
    file: File,
) {
    const relativePath =
        (file as File & {
            webkitRelativePath?: string;
        }).webkitRelativePath;

    if (!relativePath) {
        return file.name;
    }

    const parts = relativePath.split("/");

    // Remove selected root folder.
    return parts.slice(1).join("/");
}

export function shouldExcludeFile(
    path: string,
) {
    const parts = path.split("/");

    if (
        parts.some((part) =>
            excludedDirectories.includes(part),
        )
    ) {
        return true;
    }

    if (excludedFiles.includes(parts.at(-1) ?? "")) {
        return true;
    }

    return false;
}

export function getExtension(
    fileName: string,
) {
    const index = fileName.lastIndexOf(".");

    if (
        index <= 0 ||
        index === fileName.length - 1
    ) {
        return undefined;
    }

    return fileName
        .substring(index + 1)
        .toLowerCase();
}

export function detectLanguage(
    fileName: string,
): ProgrammingLanguage | undefined {
    const extension = getExtension(fileName);

    if (!extension) {
        return undefined;
    }

    return languageByExtension[extension];
}

export function detectFileType(
    fileName: string,
): FileType {
    const lowerName =
        fileName.toLowerCase();

    if (
        testPatterns.some((pattern) =>
            lowerName.includes(pattern),
        )
    ) {
        return "TEST";
    }

    if (
        configFiles.some(
            (file) =>
                file.toLowerCase() === lowerName,
        )
    ) {
        return "CONFIG";
    }

    if (
        documentationFiles.some(
            (file) =>
                file.toLowerCase() === lowerName,
        )
    ) {
        return "DOCUMENTATION";
    }

    const extension =
        getExtension(fileName);

    if (
        extension &&
        sourceExtensions.includes(extension)
    ) {
        return "SOURCE";
    }

    return "OTHER";
}