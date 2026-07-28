import {
    Controller,
    Param,
    Post,
} from '@nestjs/common';
import {
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiTags,
} from '@nestjs/swagger';

import { ExecutionService } from './execution.service';
import { CurrentUser } from '../../../auth/decorators/current-user.decorator';

@ApiTags('Execution')
@Controller('executions')
export class ExecutionController {
    constructor(
        private readonly executionService: ExecutionService,
    ) { }

    @Post(':submissionId/execute')
    @ApiOperation({
        summary: 'Execute a submission',
        description:
            'Starts the execution pipeline for a submitted solution.',
    })
    @ApiParam({
        name: 'submissionId',
        description: 'Submission ID',
        type: String,
        example: 'cms4dt5bn00050obm1zle80me',
    })
    @ApiResponse({
        status: 200,
        description: 'Submission execution started successfully.',
    })
    @ApiResponse({
        status: 401,
        description: 'Unauthorized.',
    })
    @ApiResponse({
        status: 404,
        description: 'Submission not found.',
    })
    async executeSubmission(
        @Param('submissionId') submissionId: string,
        @CurrentUser() user: any,
    ) {
        return this.executionService.executeSubmission(
            submissionId,
            user,
        );
    }
}