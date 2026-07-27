import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { BugQueryDto } from './dto/bug-query.dto';
import { UpdateBugDto } from './dto/update-bug.dto';

@Injectable()
export class BugService {
    constructor(private readonly prisma: PrismaService) { }

    async findAll(query: BugQueryDto) {
        const {
            page = 1,
            limit = 10,
            search,
            difficulty,
            projectId,
            isPublished,
        } = query;

        const where: any = {};

        if (search) {
            where.OR = [
                {
                    title: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
                {
                    description: {
                        contains: search,
                        mode: 'insensitive',
                    },
                },
            ];
        }

        if (difficulty) where.difficulty = difficulty;
        if (projectId) where.projectId = projectId;
        if (typeof isPublished === 'boolean') {
            where.isPublished = isPublished;
        }

        const [bugs, total] = await this.prisma.$transaction([
            this.prisma.bug.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    displayOrder: 'asc',
                },
            }),
            this.prisma.bug.count({
                where,
            }),
        ]);

        return {
            data: bugs,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async create(projectId: string, createBugDto: CreateBugDto) {
        const project = await this.prisma.project.findUnique({
            where: {
                id: projectId,
            },
        });

        if (!project) {
            throw new NotFoundException('Project not found.');
        }

        const existingBug = await this.prisma.bug.findFirst({
            where: {
                projectId,
                OR: [
                    { slug: createBugDto.slug },
                    { displayOrder: createBugDto.displayOrder },
                ],
            },
        });

        if (existingBug) {
            throw new BadRequestException(
                'Bug with the same slug or display order already exists.',
            );
        }

        return this.prisma.bug.create({
            data: {
                ...createBugDto,
                projectId,
            },
        });
    }

    async findOne(id: string) {
        const bug = await this.prisma.bug.findUnique({
            where: {
                id,
            },
        });

        if (!bug) {
            throw new NotFoundException('Bug not found.');
        }

        return bug;
    }

    async update(id: string, updateBugDto: UpdateBugDto) {
        await this.findOne(id);

        return this.prisma.bug.update({
            where: {
                id,
            },
            data: updateBugDto,
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        await this.prisma.bug.delete({
            where: {
                id,
            },
        });

        return {
            message: 'Bug deleted successfully.',
        };
    }
}