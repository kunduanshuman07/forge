import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { SnapshotFileController } from './snapshot-file.controller';
import { SnapshotFileService } from './snapshot-file.service';

@Module({
  imports: [PrismaModule],
  controllers: [SnapshotFileController],
  providers: [SnapshotFileService],
})
export class SnapshotFileModule {}