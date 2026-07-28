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

import { CreateSnapshotFileDto } from './dto/create-snapshot-file.dto';
import { SnapshotFileQueryDto } from './dto/snapshot-file-query.dto';
import { UpdateSnapshotFileDto } from './dto/update-snapshot-file.dto';
import { SnapshotFileService } from './snapshot-file.service';

@Controller({
    path: 'snapshot-files',
    version: '1',
})
export class SnapshotFileController {
    constructor(
        private readonly snapshotFileService: SnapshotFileService,
    ) { }

    @Post(':snapshotId')
    create(
        @Param('snapshotId') snapshotId: string,
        @Body() createSnapshotFileDto: CreateSnapshotFileDto,
    ) {
        return this.snapshotFileService.create(
            snapshotId,
            createSnapshotFileDto,
        );
    }

    @Get()
    findAll(@Query() query: SnapshotFileQueryDto) {
        return this.snapshotFileService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.snapshotFileService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateSnapshotFileDto: UpdateSnapshotFileDto,
    ) {
        return this.snapshotFileService.update(
            id,
            updateSnapshotFileDto,
        );
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.snapshotFileService.remove(id);
    }
}