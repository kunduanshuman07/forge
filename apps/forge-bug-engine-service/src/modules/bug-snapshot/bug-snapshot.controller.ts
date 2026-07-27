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
import { ApiTags } from '@nestjs/swagger';
import { BugSnapshotService } from './bug-snapshot.service';
import { CreateBugSnapshotDto } from './dto/create-bug-snapshot.dto';
import { BugSnapshotQueryDto } from './dto/bug-snapshot-query.dto';
import { UpdateBugSnapshotDto } from './dto/update-bug-snapshot.dto';

@ApiTags('Bug Snapshots')
@Controller('bug-snapshots')
export class BugSnapshotController {
    constructor(
        private readonly bugSnapshotService: BugSnapshotService,
    ) { }

    @Post(':bugId')
    create(
        @Param('bugId') bugId: string,
        @Body() createBugSnapshotDto: CreateBugSnapshotDto,
    ) {
        return this.bugSnapshotService.create(
            bugId,
            createBugSnapshotDto,
        );
    }

    @Get()
    findAll(@Query() query: BugSnapshotQueryDto) {
        return this.bugSnapshotService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bugSnapshotService.findOne(id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateBugSnapshotDto: UpdateBugSnapshotDto,
    ) {
        return this.bugSnapshotService.update(id, updateBugSnapshotDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bugSnapshotService.remove(id);
    }
}