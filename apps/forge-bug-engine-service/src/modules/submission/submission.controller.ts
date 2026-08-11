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
        @CurrentUser() user: any,
        @Query() query: SubmissionQueryDto,
    ) {
        return this.submissionService.findAll(
            user.userId,
            query,
        );
    }

    @Get(':id')
    findOne(
        @CurrentUser() user: any,
        @Param('id') id: string,
    ) {
        return this.submissionService.findOne(
            id,
            user.userId,
        );
    }

    @Get(':submissionId/files')
    findFiles(
        @CurrentUser() user: any,
        @Param('submissionId') submissionId: string,
    ) {
        return this.submissionService.findFiles(
            submissionId,
            user.userId,
        );
    }

    @Patch(':submissionId/files/:fileId')
    updateFile(
        @CurrentUser() user: any,

        @Param('submissionId') submissionId: string,

        @Param('fileId') fileId: string,

        @Body() dto: UpdateSubmissionFileDto,
    ) {
        return this.submissionService.updateFile(
            submissionId,
            fileId,
            user.userId,
            dto,
        );
    }
}