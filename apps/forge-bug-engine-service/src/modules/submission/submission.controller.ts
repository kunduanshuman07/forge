import {
    Body,
    Controller,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';

import { CreateSubmissionDto } from './dto/create-submission.dto';
import { SubmissionQueryDto } from './dto/submission-query.dto';
import { SubmissionService } from './submission.service';
import { CurrentUser } from '../../auth/decorators/current-user.decorator';
import { UpdateSubmissionFileDto } from './dto/update-submission-file.dto';

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

    @Get(':submissionId/files')
    findFiles(
        @Param('submissionId') submissionId: string,
    ) {
        return this.submissionService.findFiles(submissionId);
    }

    @Patch(':submissionId/files/:fileId')
    updateFile(
        @Param('submissionId') submissionId: string,

        @Param('fileId') fileId: string,

        @Body() dto: UpdateSubmissionFileDto,
    ) {
        return this.submissionService.updateFile(
            submissionId,
            fileId,
            dto,
        );
    }
}