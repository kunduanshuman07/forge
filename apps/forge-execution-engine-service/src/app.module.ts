import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from "./health/health.module";
import { ExecutionModule } from './modules/execution/execution.module';
import { AuthModule } from '../auth/auth.module';
import { WorkspaceModule } from './modules/workspace/workspace.module';
import { CommandModule } from './modules/command/command.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    PrismaModule,
    AuthModule,
    HealthModule,
    ExecutionModule,
    WorkspaceModule,
    CommandModule
  ],
})
export class AppModule { }