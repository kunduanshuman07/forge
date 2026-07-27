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
import { BugService } from './bug.service';
import { CreateBugDto } from './dto/create-bug.dto';
import { BugQueryDto } from './dto/bug-query.dto';
import { UpdateBugDto } from './dto/update-bug.dto';

@ApiTags('Bugs')
@Controller('bugs')
export class BugController {
    constructor(private readonly bugService: BugService) { }

    @Post('/:projectId')
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
    update(
        @Param('id') id: string,
        @Body() updateBugDto: UpdateBugDto,
    ) {
        return this.bugService.update(id, updateBugDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.bugService.remove(id);
    }
}