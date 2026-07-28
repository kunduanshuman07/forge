import {
    Injectable,
    NotFoundException,
    NotImplementedException,
} from '@nestjs/common';

import { PrismaService } from '../../prisma/prisma.service';
import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { TestCaseQueryDto } from './dto/test-case-query.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { TestCaseValidation } from '../../helpers/test-case/test-case-validation';

@Injectable()
export class TestCaseService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    async create(
        snapshotId: string,
        createTestCaseDto: CreateTestCaseDto,
    ) {
        const snapshot = await this.prisma.bugSnapshot.findUnique({
            where: {
                id: snapshotId,
            },
        });

        if (!snapshot) {
            throw new NotFoundException(
                'Bug Snapshot not found.',
            );
        }

        createTestCaseDto =
            await TestCaseValidation.validateCreate(
                this.prisma,
                snapshotId,
                createTestCaseDto,
            );

        return this.prisma.testCase.create({
            data: {
                ...createTestCaseDto,
                snapshotId,
            },
        });
    }

    async findAll(query: TestCaseQueryDto) {
        const {
            snapshotId,
            page = 1,
            limit = 10,
        } = query;

        const where = {
            ...(snapshotId && { snapshotId }),
        };

        const [data, total] = await this.prisma.$transaction([
            this.prisma.testCase.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: {
                    displayOrder: 'asc',
                },
            }),
            this.prisma.testCase.count({
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
        const testCase = await this.prisma.testCase.findUnique({
            where: {
                id,
            },
        });

        if (!testCase) {
            throw new NotFoundException(
                'Test Case not found.',
            );
        }

        return testCase;
    }

    async update(
        id: string,
        updateTestCaseDto: UpdateTestCaseDto,
    ) {
        const existing = await this.findOne(id);

        updateTestCaseDto =
            await TestCaseValidation.validateUpdate(
                this.prisma,
                existing.snapshotId,
                id,
                existing,
                updateTestCaseDto,
            );

        return this.prisma.testCase.update({
            where: {
                id,
            },
            data: updateTestCaseDto,
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        await this.prisma.testCase.delete({
            where: {
                id,
            },
        });

        return {
            message: 'Test Case deleted successfully.',
        };
    }
}