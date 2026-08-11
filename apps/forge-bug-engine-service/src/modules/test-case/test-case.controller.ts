import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';

import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { TestCaseQueryDto } from './dto/test-case-query.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { TestCaseService } from './test-case.service';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('test-cases')
export class TestCaseController {
    constructor(
        private readonly testCaseService: TestCaseService,
    ) { }

    @Post(':snapshotId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(
        @Param('snapshotId') snapshotId: string,
        @Body() createTestCaseDto: CreateTestCaseDto,
    ) {
        return this.testCaseService.create(
            snapshotId,
            createTestCaseDto,
        );
    }

    @Get()
    findAll(@Query() query: TestCaseQueryDto) {
        return this.testCaseService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testCaseService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(
        @Param('id') id: string,
        @Body() updateTestCaseDto: UpdateTestCaseDto,
    ) {
        return this.testCaseService.update(
            id,
            updateTestCaseDto,
        );
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.testCaseService.remove(id);
    }
}