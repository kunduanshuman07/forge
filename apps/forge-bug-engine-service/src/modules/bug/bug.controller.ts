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
import { BugService } from './bug.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { BugQueryDto } from './dto/bug-query.dto';
import { UpdateBugDto } from './dto/update-bug.dto';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../../auth/guards/roles.guard';

@ApiTags('Bugs')
@Controller('bugs')
export class BugController {
    constructor(private readonly bugService: BugService) { }

    @Post('/:projectId')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    create(
        @Param('projectId') projectId: string,
        @Body() createBugDto: CreateBugDto,
    ) {
        return this.bugService.create(projectId, createBugDto);
    }

    @Get()
    findAll(@Query() query: BugQueryDto) {
        return this.bugService.findAll(query);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bugService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    update(
        @Param('id') id: string,
        @Body() updateBugDto: UpdateBugDto,
    ) {
        return this.bugService.update(id, updateBugDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(UserRole.ADMIN)
    remove(@Param('id') id: string) {
        return this.bugService.remove(id);
    }
}