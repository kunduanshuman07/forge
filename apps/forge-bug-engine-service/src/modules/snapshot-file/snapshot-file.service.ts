import {
    Injectable,
    NotFoundException,
} from '@nestjs/common';

import { SnapshotFileValidation } from '../../helpers/snapshot-file/snapshot-file-validation';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSnapshotFileDto } from './dto/create-snapshot-file.dto';
import { SnapshotFileQueryDto } from './dto/snapshot-file-query.dto';
import { UpdateSnapshotFileDto } from './dto/update-snapshot-file.dto';

@Injectable()
export class SnapshotFileService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(
        snapshotId: string,
        createSnapshotFileDto: CreateSnapshotFileDto,
    ) {
        const snapshot = await this.prisma.bugSnapshot.findUnique({
            where: {
                id: snapshotId,
            },
        });

        if (!snapshot) {
            throw new NotFoundException('Bug Snapshot not found.');
        }

        createSnapshotFileDto =
            await SnapshotFileValidation.validateCreate(
                this.prisma,
                snapshotId,
                createSnapshotFileDto,
            );

        const size = Buffer.byteLength(
            createSnapshotFileDto.content,
            'utf8',
        );

        return this.prisma.snapshotFile.create({
            data: {
                ...createSnapshotFileDto,
                snapshotId,
                size,
            },
        });
    }

    async findAll(query: SnapshotFileQueryDto) {
        const {
            snapshotId,
            page = 1,
            limit = 10,
        } = query;

        const where = {
            ...(snapshotId && { snapshotId }),
        };

        const [data, total] = await this.prisma.$transaction([
            this.prisma.snapshotFile.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    displayOrder: 'asc',
                },
            }),
            this.prisma.snapshotFile.count({
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
        const snapshotFile = await this.prisma.snapshotFile.findUnique({
            where: {
                id,
            },
        });

        if (!snapshotFile) {
            throw new NotFoundException(
                'Snapshot File not found.',
            );
        }

        return snapshotFile;
    }

    async update(
        id: string,
        updateSnapshotFileDto: UpdateSnapshotFileDto,
    ) {
        const snapshotFile = await this.findOne(id);

        if (
            updateSnapshotFileDto.path ||
            updateSnapshotFileDto.name ||
            updateSnapshotFileDto.extension
        ) {
            updateSnapshotFileDto =
                await SnapshotFileValidation.validateUpdate(
                    this.prisma,
                    snapshotFile.snapshotId,
                    id,
                    snapshotFile,
                    updateSnapshotFileDto,
                );
        }

        const data: UpdateSnapshotFileDto & { size?: number } = {
            ...updateSnapshotFileDto,
        };

        if (updateSnapshotFileDto.content !== undefined) {
            data.size = Buffer.byteLength(
                updateSnapshotFileDto.content,
                'utf8',
            );
        }

        return this.prisma.snapshotFile.update({
            where: {
                id,
            },
            data,
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        await this.prisma.snapshotFile.delete({
            where: {
                id,
            },
        });

        return {
            message: 'Snapshot File deleted successfully.',
        };
    }
}