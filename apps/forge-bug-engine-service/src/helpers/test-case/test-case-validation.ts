import { BadRequestException } from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateTestCaseDto } from '../../modules/test-case/dto/create-test-case.dto';
import { UpdateTestCaseDto } from '../../modules/test-case/dto/update-test-case.dto';
import { TestCase } from '@prisma/client';

export class TestCaseValidation {
    static async validateCreate(
        prisma: PrismaService,
        snapshotId: string,
        dto: CreateTestCaseDto,
    ): Promise<CreateTestCaseDto> {
        dto.name = dto.name.trim();
        dto.command = dto.command.trim();
        dto.description = dto.description?.trim();
        dto.expectedOutput = dto.expectedOutput?.trim();

        if (!dto.name) {
            throw new BadRequestException(
                'Test case name is required.',
            );
        }

        if (!dto.command) {
            throw new BadRequestException(
                'Command cannot be empty.',
            );
        }

        if (
            dto.timeoutSeconds &&
            dto.timeoutSeconds > 300
        ) {
            throw new BadRequestException(
                'Timeout cannot exceed 300 seconds.',
            );
        }

        const duplicateName =
            await prisma.testCase.findFirst({
                where: {
                    snapshotId,
                    name: dto.name,
                },
            });

        if (duplicateName) {
            throw new BadRequestException(
                `Test case '${dto.name}' already exists in this snapshot.`,
            );
        }

        const duplicateOrder =
            await prisma.testCase.findFirst({
                where: {
                    snapshotId,
                    displayOrder: dto.displayOrder,
                },
            });

        if (duplicateOrder) {
            throw new BadRequestException(
                `Display order '${dto.displayOrder}' already exists in this snapshot.`,
            );
        }

        return dto;
    }

    static async validateUpdate(
        prisma: PrismaService,
        snapshotId: string,
        id: string,
        existing: TestCase,
        dto: UpdateTestCaseDto,
    ): Promise<UpdateTestCaseDto> {
        const mergedName = (
            dto.name ?? existing.name
        ).trim();

        const mergedCommand = (
            dto.command ?? existing.command
        ).trim();

        if (!mergedName) {
            throw new BadRequestException(
                'Test case name is required.',
            );
        }

        if (!mergedCommand) {
            throw new BadRequestException(
                'Command cannot be empty.',
            );
        }

        if (
            dto.timeoutSeconds &&
            dto.timeoutSeconds > 300
        ) {
            throw new BadRequestException(
                'Timeout cannot exceed 300 seconds.',
            );
        }

        const duplicateName =
            await prisma.testCase.findFirst({
                where: {
                    snapshotId,
                    name: mergedName,
                    NOT: {
                        id,
                    },
                },
            });

        if (duplicateName) {
            throw new BadRequestException(
                `Test case '${mergedName}' already exists in this snapshot.`,
            );
        }

        if (
            dto.displayOrder !== undefined &&
            dto.displayOrder !== existing.displayOrder
        ) {
            const duplicateOrder =
                await prisma.testCase.findFirst({
                    where: {
                        snapshotId,
                        displayOrder: dto.displayOrder,
                        NOT: {
                            id,
                        },
                    },
                });

            if (duplicateOrder) {
                throw new BadRequestException(
                    `Display order '${dto.displayOrder}' already exists in this snapshot.`,
                );
            }
        }

        return dto;
    }
}