import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';

import { SubmissionStatus } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CommandService } from '../command/command.service';
import { WorkspaceService } from '../workspace/workspace.service';
import { CommandResultDto } from '../command/dto/command-result.dto';

@Injectable()
export class ExecutionService {
    constructor(
        private readonly prisma: PrismaService,
        private readonly workspaceService: WorkspaceService,
        private readonly commandService: CommandService,
    ) { }

    async executeSubmission(
        submissionId: string,
        user: any,
    ) {
        const submission = await this.loadSubmission(
            submissionId,
        );

        if (!submission) {
            throw new NotFoundException(
                `Submission with ID '${submissionId}' not found.`,
            );
        }

        await this.updateSubmissionStatus(submission.id, {
            status: SubmissionStatus.RUNNING,
            startedAt: new Date(),
        });

        try {
            /**
             * Create workspace
             */
            const workspacePath =
                await this.workspaceService.createWorkspace(
                    submission.id,
                );

            /**
             * Write submission files
             */
            await this.workspaceService.writeFiles(
                workspacePath,
                submission.files,
            );

            /**
             * INSTALL
             */
            const installResult = await this.executeStep(
                'INSTALL',
                submission.snapshot.installCommand,
                workspacePath,
            );

            if (installResult.exitCode !== 0) {
                await this.updateSubmissionStatus(submission.id, {
                    status: SubmissionStatus.FAILED,
                    executionTimeMs:
                        installResult.executionTimeMs,
                    completedAt: new Date(),
                });

                const updatedSubmission =
                    await this.loadSubmission(
                        submission.id,
                    );

                return {
                    data: {
                        submission: updatedSubmission,
                        step: 'INSTALL',
                        installResult,
                        executionTimeMs:
                            installResult.executionTimeMs,
                    }
                };
            }

            /**
             * BUILD
             */
            const buildResult = await this.executeStep(
                'BUILD',
                submission.snapshot.buildCommand,
                workspacePath,
            );

            if (buildResult.exitCode !== 0) {
                const totalExecutionTime =
                    installResult.executionTimeMs +
                    buildResult.executionTimeMs;

                await this.updateSubmissionStatus(
                    submission.id,
                    {
                        status: SubmissionStatus.FAILED,
                        executionTimeMs:
                            totalExecutionTime,
                        completedAt: new Date(),
                    },
                );

                const updatedSubmission =
                    await this.loadSubmission(
                        submission.id,
                    );

                return {
                    data: {
                        submission: updatedSubmission,
                        step: 'BUILD',
                        installResult,
                        buildResult,
                        executionTimeMs:
                            totalExecutionTime,
                    }
                };
            }

            /**
             * Execute test cases
             */
            const testResults =
                await this.executeTestCases(
                    submission,
                    workspacePath,
                );

            /**
             * Persist test results
             */
            await this.saveTestResults(
                submission.id,
                testResults,
            );

            /**
             * Calculate score
             */
            const totalScore = testResults.reduce(
                (score, { testCase, result }) =>
                    result.exitCode === 0
                        ? score + testCase.points
                        : score,
                0,
            );

            /**
             * Total execution time
             */
            const totalExecutionTime =
                installResult.executionTimeMs +
                buildResult.executionTimeMs +
                testResults.reduce(
                    (time, { result }) =>
                        time +
                        result.executionTimeMs,
                    0,
                );

            /**
             * Passed?
             */
            const passed = testResults.every(
                ({ result }) =>
                    result.exitCode === 0,
            );

            /**
             * Update submission
             */
            await this.updateSubmissionStatus(
                submission.id,
                {
                    status: passed
                        ? SubmissionStatus.PASSED
                        : SubmissionStatus.FAILED,
                    executionTimeMs:
                        totalExecutionTime,
                    completedAt: new Date(),
                },
            );

            /**
             * Save score
             */
            await this.prisma.submission.update({
                where: {
                    id: submission.id,
                },
                data: {
                    score: totalScore,
                },
            });

            /**
             * Reload updated submission
             */
            const updatedSubmission =
                await this.loadSubmission(
                    submission.id,
                );

            /**
             * Return execution summary
             */
            return {
                data: {
                    submission: updatedSubmission,
                    step: 'TEST',
                    installResult,
                    buildResult,
                    testResults,
                    score: totalScore,
                    executionTimeMs:
                        totalExecutionTime,
                }
            };
        } catch (error) {
            await this.updateSubmissionStatus(
                submission.id,
                {
                    status: SubmissionStatus.FAILED,
                    completedAt: new Date(),
                },
            );

            throw error;
        }
    }

    private async executeStep(
        step: string,
        command: string | null,
        workspacePath: string,
    ) {
        if (!command) {
            throw new InternalServerErrorException(
                `${step} command is not configured.`,
            );
        }

        const [cmd, ...args] = command.trim().split(/\s+/);

        const result = await this.commandService.execute(
            cmd,
            args,
            workspacePath,
        );

        return result;
    }

    private async loadSubmission(
        submissionId: string,
    ) {
        return this.prisma.submission.findUnique({
            where: {
                id: submissionId,
            },
            include: {
                bug: true,
                snapshot: {
                    include: {
                        testCases: {
                            orderBy: {
                                displayOrder: 'asc',
                            },
                        },
                    },
                },
                files: {
                    orderBy: {
                        displayOrder: 'asc',
                    },
                },
            },
        });
    }

    private async updateSubmissionStatus(
        submissionId: string,
        data: {
            status?: SubmissionStatus;
            startedAt?: Date;
            completedAt?: Date;
            executionTimeMs?: number;
        },
    ) {
        return this.prisma.submission.update({
            where: {
                id: submissionId,
            },
            data,
        });
    }

    private async executeTestCases(
        submission: any,
        workspacePath: string,
    ) {
        const results: {
            testCase: any;
            result: CommandResultDto;
        }[] = [];

        for (const testCase of submission.snapshot.testCases) {
            const result = await this.executeStep(
                testCase.name,
                testCase.command,
                workspacePath,
            );

            results.push({
                testCase,
                result,
            });
        }

        return results;
    }

    private async saveTestResults(
        submissionId: string,
        results: {
            testCase: any;
            result: CommandResultDto;
        }[],
    ) {
        for (const { testCase, result } of results) {
            await this.prisma.submissionTestResult.upsert({
                where: {
                    submissionId_testCaseId: {
                        submissionId,
                        testCaseId: testCase.id,
                    },
                },
                update: {
                    passed: result.exitCode === 0,
                    executionTimeMs: result.executionTimeMs,
                    output:
                        result.stdout ||
                        result.stderr ||
                        null,
                },
                create: {
                    submissionId,
                    testCaseId: testCase.id,
                    passed: result.exitCode === 0,
                    executionTimeMs: result.executionTimeMs,
                    output:
                        result.stdout ||
                        result.stderr ||
                        null,
                },
            });
        }
    }
}