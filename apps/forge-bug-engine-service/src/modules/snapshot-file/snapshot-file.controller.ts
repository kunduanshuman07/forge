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

import { CreateSnapshotFileDto } from './dto/create-snapshot-file.dto';
import { SnapshotFileQueryDto } from './dto/snapshot-file-query.dto';
import { UpdateSnapshotFileDto } from './dto/update-snapshot-file.dto';
import { SnapshotFileService } from './snapshot-file.service';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

@Controller({
    path: 'snapshot-files',
    version: '1',
})
export class SnapshotFileController {
    constructor(
        private readonly snapshotFileService: SnapshotFileService,
    ) { }

    @Post(':snapshotId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
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
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.snapshotFileService.remove(id);
    }
}