import { BadRequestException } from '@nestjs/common';
import { SnapshotFile } from '@prisma/client';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateSnapshotFileDto } from '../../modules/snapshot-file/dto/create-snapshot-file.dto';
import { UpdateSnapshotFileDto } from '../../modules/snapshot-file/dto/update-snapshot-file.dto';

export class SnapshotFileValidation {
    static async validateCreate(
        prisma: PrismaService,
        snapshotId: string,
        dto: CreateSnapshotFileDto,
    ): Promise<CreateSnapshotFileDto> {
        dto.path = this.normalizePath(dto.path);
        dto.name = dto.name.trim();

        this.validateTraversal(dto.path);
        this.validateFileName(dto.path, dto.name);

        dto.extension = this.resolveExtension(
            dto.path,
            dto.extension,
        );

        await this.ensureUniquePath(
            prisma,
            snapshotId,
            dto.path,
        );

        await this.ensureUniqueDisplayOrder(
            prisma,
            snapshotId,
            dto.displayOrder,
        );

        return dto;
    }

    static async validateUpdate(
        prisma: PrismaService,
        snapshotId: string,
        fileId: string,
        existingFile: SnapshotFile,
        dto: UpdateSnapshotFileDto,
    ): Promise<UpdateSnapshotFileDto> {
        const mergedPath = this.normalizePath(
            dto.path ?? existingFile.path,
        );

        const mergedName = (
            dto.name ?? existingFile.name
        ).trim();

        const mergedExtension = this.resolveExtension(
            mergedPath,
            dto.extension ?? existingFile.extension ?? undefined,
        );

        this.validateTraversal(mergedPath);
        this.validateFileName(
            mergedPath,
            mergedName,
        );

        const duplicatePath =
            await prisma.snapshotFile.findFirst({
                where: {
                    snapshotId,
                    path: mergedPath,
                    NOT: {
                        id: fileId,
                    },
                },
            });

        if (duplicatePath) {
            throw new BadRequestException(
                `File path '${mergedPath}' already exists in this snapshot.`,
            );
        }

        if (
            dto.displayOrder !== undefined &&
            dto.displayOrder !== existingFile.displayOrder
        ) {
            const duplicateDisplayOrder =
                await prisma.snapshotFile.findFirst({
                    where: {
                        snapshotId,
                        displayOrder: dto.displayOrder,
                        NOT: {
                            id: fileId,
                        },
                    },
                });

            if (duplicateDisplayOrder) {
                throw new BadRequestException(
                    `Display order '${dto.displayOrder}' already exists in this snapshot.`,
                );
            }
        }

        dto.path = mergedPath;
        dto.name = mergedName;
        dto.extension = mergedExtension;

        return dto;
    }

    private static async ensureUniquePath(
        prisma: PrismaService,
        snapshotId: string,
        path: string,
    ) {
        const existing =
            await prisma.snapshotFile.findFirst({
                where: {
                    snapshotId,
                    path,
                },
            });

        if (existing) {
            throw new BadRequestException(
                `File path '${path}' already exists in this snapshot.`,
            );
        }
    }

    private static async ensureUniqueDisplayOrder(
        prisma: PrismaService,
        snapshotId: string,
        displayOrder: number,
    ) {
        const existing =
            await prisma.snapshotFile.findFirst({
                where: {
                    snapshotId,
                    displayOrder,
                },
            });

        if (existing) {
            throw new BadRequestException(
                `Display order '${displayOrder}' already exists in this snapshot.`,
            );
        }
    }

    private static normalizePath(
        filePath: string,
    ): string {
        return filePath
            .trim()
            .replace(/\\/g, '/')
            .replace(/\/+/g, '/');
    }

    private static validateTraversal(
        filePath: string,
    ) {
        if (
            filePath.includes('..') ||
            filePath.startsWith('/') ||
            filePath.startsWith('./') ||
            filePath.startsWith('~/')
        ) {
            throw new BadRequestException(
                'Invalid file path.',
            );
        }
    }

    private static validateFileName(
        filePath: string,
        fileName: string,
    ) {
        const actualName =
            filePath.split('/').pop() ?? '';

        if (actualName !== fileName) {
            throw new BadRequestException(
                'File name must match the file path.',
            );
        }
    }

    private static resolveExtension(
        filePath: string,
        extension?: string,
    ) {
        const actualExtension = filePath.includes('.')
            ? filePath.split('.').pop()
            : undefined;

        if (!extension) {
            return actualExtension;
        }

        if (extension !== actualExtension) {
            throw new BadRequestException(
                'Extension does not match file path.',
            );
        }

        return extension;
    }
}