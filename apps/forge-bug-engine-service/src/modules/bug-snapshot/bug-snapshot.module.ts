import { Module } from '@nestjs/common';
import { PrismaModule } from '../../prisma/prisma.module';
import { BugSnapshotController } from './bug-snapshot.controller';
import { BugSnapshotService } from './bug-snapshot.service';

@Module({
  imports: [PrismaModule],
  controllers: [BugSnapshotController],
  providers: [BugSnapshotService],
})
export class BugSnapshotModule {}