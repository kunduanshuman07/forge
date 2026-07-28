import { Module } from '@nestjs/common';

import { PrismaModule } from '../../prisma/prisma.module';
import { TestCaseController } from './test-case.controller';
import { TestCaseService } from './test-case.service';

@Module({
  imports: [PrismaModule],
  controllers: [TestCaseController],
  providers: [TestCaseService],
})
export class TestCaseModule { }