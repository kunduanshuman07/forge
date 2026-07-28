import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';

@Injectable()
export class WorkspaceService {
    private readonly workspaceRoot = path.join(
        process.cwd(),
        'workspaces',
    );

    async createWorkspace(submissionId: string): Promise<string> {
        const workspacePath = path.join(
            this.workspaceRoot,
            submissionId,
        );

        await fs.rm(workspacePath, {
            recursive: true,
            force: true,
        });

        await fs.mkdir(workspacePath, {
            recursive: true,
        });

        return workspacePath;
    }

    async writeFiles(
        workspacePath: string,
        files: {
            path: string;
            content: string;
        }[],
    ): Promise<void> {
        for (const file of files) {
            const filePath = path.join(
                workspacePath,
                file.path,
            );

            await fs.mkdir(path.dirname(filePath), {
                recursive: true,
            });

            await fs.writeFile(
                filePath,
                file.content,
                'utf8',
            );
        }
    }
}