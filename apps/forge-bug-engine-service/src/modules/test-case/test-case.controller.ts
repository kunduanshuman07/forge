import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { CreateTestCaseDto } from './dto/create-test-case.dto';
import { TestCaseQueryDto } from './dto/test-case-query.dto';
import { UpdateTestCaseDto } from './dto/update-test-case.dto';
import { TestCaseService } from './test-case.service';

@Controller({
    path: 'test-cases',
    version: '1',
})
export class TestCaseController {
    constructor(
        private readonly testCaseService: TestCaseService,
    ) { }

    @Post(':snapshotId')
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
    remove(@Param('id') id: string) {
        return this.testCaseService.remove(id);
    }
}