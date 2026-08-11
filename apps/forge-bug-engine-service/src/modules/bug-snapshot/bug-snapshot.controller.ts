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
import { ApiTags } from '@nestjs/swagger';
import { BugSnapshotService } from './bug-snapshot.service';
import { CreateBugSnapshotDto } from './dto/create-bug-snapshot.dto';
import { BugSnapshotQueryDto } from './dto/bug-snapshot-query.dto';
import { UpdateBugSnapshotDto } from './dto/update-bug-snapshot.dto';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@ApiTags('Bug Snapshots')
@Controller('bug-snapshots')
export class BugSnapshotController {
    constructor(
        private readonly bugSnapshotService: BugSnapshotService,
    ) { }

    @Post(':bugId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(
        @Param('id') id: string,
        @Body() updateBugSnapshotDto: UpdateBugSnapshotDto,
    ) {
        return this.bugSnapshotService.update(id, updateBugSnapshotDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.bugSnapshotService.remove(id);
    }
}