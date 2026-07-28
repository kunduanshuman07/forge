import {
    BadRequestException,
    NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubmissionDto } from '../../modules/submission/dto/create-submission.dto';

export class SubmissionWorkflow {
    static async start(
        prisma: PrismaService,
        userId: string,
        dto: CreateSubmissionDto,
    ) {
        const bug = await prisma.bug.findUnique({
            where: {
                id: dto.bugId,
            },
        });

        if (!bug) {
            throw new NotFoundException('Bug not found.');
        }

        const snapshot = await prisma.bugSnapshot.findFirst({
            where: {
                bugId: bug.id,
                isLatest: true,
            },
        });

        if (!snapshot) {
            throw new NotFoundException(
                'Latest bug snapshot not found.',
            );
        }

        if (snapshot.bugId !== bug.id) {
            throw new BadRequestException(
                'Snapshot does not belong to the specified bug.',
            );
        }

        return prisma.$transaction(async (tx) => {
            const submission =
                await tx.submission.create({
                    data: {
                        userId,
                        bugId: bug.id,
                        snapshotId: snapshot.id,
                    },
                });

            const snapshotFiles =
                await tx.snapshotFile.findMany({
                    where: {
                        snapshotId: snapshot.id,
                    },
                });

            if (snapshotFiles.length) {
                await tx.submissionFile.createMany({
                    data: snapshotFiles.map((file) => ({
                        submissionId: submission.id,

                        path: file.path,
                        name: file.name,
                        extension: file.extension,

                        language: file.language,
                        type: file.type,

                        content: file.content,

                        size: file.size,

                        isEditable: file.isEditable,
                        isHidden: file.isHidden,

                        displayOrder: file.displayOrder,
                    })),
                });
            }

            return {
                message: 'Submission created successfully.',
                submission,
                filesCopied: snapshotFiles.length,
            };
        });
    }
}