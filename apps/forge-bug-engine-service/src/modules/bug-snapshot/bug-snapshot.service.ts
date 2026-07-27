import {
    BadRequestException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateBugSnapshotDto } from './dto/create-bug-snapshot.dto';
import { BugSnapshotQueryDto } from './dto/bug-snapshot-query.dto';
import { UpdateBugSnapshotDto } from './dto/update-bug-snapshot.dto';

@Injectable()
export class BugSnapshotService {
    constructor(private readonly prisma: PrismaService) { }

    async create(
        bugId: string,
        createBugSnapshotDto: CreateBugSnapshotDto,
    ) {
        return this.prisma.$transaction(async (tx) => {
            // 1. Check bug exists
            const bug = await tx.bug.findUnique({
                where: {
                    id: bugId,
                },
            });

            if (!bug) {
                throw new NotFoundException('Bug not found.');
            }

            // 2. Get latest snapshot
            const latestSnapshot = await tx.bugSnapshot.findFirst({
                where: {
                    bugId,
                },
                orderBy: {
                    version: 'desc',
                },
            });

            const nextVersion = latestSnapshot
                ? latestSnapshot.version + 1
                : 1;

            // 3. Mark previous latest as false
            if (latestSnapshot) {
                await tx.bugSnapshot.update({
                    where: {
                        id: latestSnapshot.id,
                    },
                    data: {
                        isLatest: false,
                    },
                });
            }

            // 4. Create new snapshot
            return tx.bugSnapshot.create({
                data: {
                    bugId,
                    version: nextVersion,
                    isLatest: true,
                    ...createBugSnapshotDto,
                },
            });
        });
    }

    async findAll(query: BugSnapshotQueryDto) {
        const {
            page = 1,
            limit = 10,
            bugId,
        } = query;

        const where: any = {};

        if (bugId) {
            where.bugId = bugId;
        }

        const [snapshots, total] = await this.prisma.$transaction([
            this.prisma.bugSnapshot.findMany({
                where,
                skip: (page - 1) * limit,
                take: limit,
                orderBy: [
                    {
                        version: 'desc',
                    },
                ],
            }),

            this.prisma.bugSnapshot.count({
                where,
            }),
        ]);

        return {
            data: snapshots,
            pagination: {
                total,
                page,
                limit,
                totalPages: Math.ceil(total / limit),
            },
        };
    }

    async findOne(id: string) {
        const snapshot = await this.prisma.bugSnapshot.findUnique({
            where: {
                id,
            },
        });

        if (!snapshot) {
            throw new NotFoundException('Bug Snapshot not found.');
        }

        return snapshot;
    }

    async update(
        id: string,
        updateBugSnapshotDto: UpdateBugSnapshotDto,
    ) {
        await this.findOne(id);

        return this.prisma.bugSnapshot.update({
            where: {
                id,
            },
            data: updateBugSnapshotDto,
        });
    }

    async remove(id: string) {
        await this.findOne(id);

        await this.prisma.bugSnapshot.delete({
            where: {
                id,
            },
        });

        return {
            message: 'Bug Snapshot deleted successfully.',
        };
    }
}