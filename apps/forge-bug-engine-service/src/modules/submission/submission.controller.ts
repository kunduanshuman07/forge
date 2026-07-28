import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
} from '@nestjs/common';

import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionQueryDto } from './dto/submission-query.dto';
import { SubmissionService } from './submission.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';

@Controller('submissions')
export class SubmissionController {
    constructor(
        private readonly submissionService: SubmissionService,
    ) { }

    @Post()
    create(
        @CurrentUser() user: any,
        @Body() createSubmissionDto: CreateSubmissionDto,
    ) {
        return this.submissionService.create(
            user.userId,
            createSubmissionDto,
        );
    }

    @Get()
    findAll(
        @Query() query: SubmissionQueryDto,
    ) {
        return this.submissionService.findAll(query);
    }

    @Get(':id')
    findOne(
        @Param('id') id: string,
    ) {
        return this.submissionService.findOne(id);
    }
}