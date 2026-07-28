import { Injectable } from '@nestjs/common';
import { spawn } from 'child_process';

import { CommandResultDto } from './dto/command-result.dto';

@Injectable()
export class CommandService {
    async execute(
        command: string,
        args: string[],
        workingDirectory: string,
    ): Promise<CommandResultDto> {
        return new Promise((resolve, reject) => {
            const startedAt = Date.now();

            const child = spawn(command, args, {
                cwd: workingDirectory,
                shell: true,
            });

            let stdout = '';
            let stderr = '';

            child.stdout.on('data', (data: Buffer) => {
                stdout += data.toString();
            });

            child.stderr.on('data', (data: Buffer) => {
                stderr += data.toString();
            });

            child.on('error', reject);

            child.on('close', (exitCode) => {
                resolve({
                    exitCode: exitCode ?? -1,
                    stdout,
                    stderr,
                    executionTimeMs: Date.now() - startedAt,
                });
            });
        });
    }
}