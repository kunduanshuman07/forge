import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProjectModule } from './modules/project/project.module';
import { AuthModule } from './auth/auth.module';
import { BugModule } from './modules/bug/bug.module';
import { BugSnapshotModule } from './modules/bug-snapshot/bug-snapshot.module';
import { SnapshotFileModule } from './modules/snapshot-file/snapshot-file.module';
import { TestCaseModule } from './modules/test-case/test-case.module';
import { SubmissionModule } from './modules/submission/submission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      expandVariables: true,
    }),
    HealthModule,
    PrismaModule,
    ProjectModule,
    AuthModule,
    BugModule,
    BugSnapshotModule,
    SnapshotFileModule,
    TestCaseModule,
    SubmissionModule
  ],
})
export class AppModule {}