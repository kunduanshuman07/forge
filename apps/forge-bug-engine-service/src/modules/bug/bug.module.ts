import { Module } from '@nestjs/common';
import { BugController } from './bug.controller';
import { BugService } from './bug.service';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BugController],
  providers: [BugService],
})
export class BugModule { }