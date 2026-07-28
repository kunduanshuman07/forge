import { Module } from '@nestjs/common';
import { ExecutionController } from './execution.controller';
import { ExecutionService } from './execution.service';
import { PrismaModule } from '../../prisma/prisma.module';
import { WorkspaceModule } from '../workspace/workspace.module';
import { CommandModule } from '../command/command.module';

@Module({
  imports: [PrismaModule, WorkspaceModule, CommandModule],
  controllers: [ExecutionController],
  providers: [ExecutionService],
  exports: [ExecutionService],
})
export class ExecutionModule { }