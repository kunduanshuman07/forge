import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { SubmissionWorkflow } from '../../helpers/submission/submission-workflow';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionQueryDto } from './dto/submission-query.dto';
import { UpdateSubmissionFileDto } from './dto/update-submission-file.dto';

@Injectable()
export class SubmissionService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(
        userId: string,
        dto: CreateSubmissionDto,
    ) {
        return SubmissionWorkflow.start(
            this.prisma,
            userId,
            dto,
        );
    }

    async findAll(query: SubmissionQueryDto) {
        const {
            userId,
            bugId,
            page = 1,
            limit = 10,
        } = query;

        const where = {
            ...(userId && { userId }),
            ...(bugId && { bugId }),
        };

        const [data, total] = await this.prisma.$transaction([
            this.prisma.submission.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                include: {
                    bug: true,
                    snapshot: true,
                },
                orderBy: {
                    startedAt: 'desc',
                },
            }),
            this.prisma.submission.count({
                where,
            }),
        ]);

        return {
            data,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const submission = await this.prisma.submission.findUnique({
            where: {
                id,
            },
            include: {
                bug: true,
                snapshot: true,
                files: {
                    orderBy: {
                        path: 'asc',
                    },
                },
                results: {
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
            },
        });

        if (!submission) {
            throw new NotFoundException(
                'Submission not found.',
            );
        }

        return submission;
    }

    async findFiles(submissionId: string) {
        const submission =
            await this.prisma.submission.findUnique({
                where: {
                    id: submissionId,
                },
                select: {
                    id: true,
                },
            });

        if (!submission) {
            throw new NotFoundException(
                'Submission not found.',
            );
        }

        const data =
            await this.prisma.submissionFile.findMany({
                where: {
                    submissionId,
                },
                orderBy: {
                    displayOrder: 'asc',
                },
            });

        return {
            data,
        };
    }

    async updateFile(
        submissionId: string,
        fileId: string,
        dto: UpdateSubmissionFileDto,
    ) {
        const file =
            await this.prisma.submissionFile.findFirst({
                where: {
                    id: fileId,
                    submissionId,
                },
            });

        if (!file) {
            throw new NotFoundException(
                'Submission file not found.',
            );
        }

        return this.prisma.submissionFile.update({
            where: {
                id: file.id,
            },
            data: {
                content: dto.content,
                size: dto.content.length,
            },
        });
    }
}