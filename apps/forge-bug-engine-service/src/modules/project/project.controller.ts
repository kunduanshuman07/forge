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
  import { ProjectService } from './project.service';
  import { CreateProjectDto } from './dto/create-project.dto';
  import { UpdateProjectDto } from './dto/update-project.dto';
  import { ProjectQueryDto } from './dto/project-query.dto';
  
  @Controller('projects')
  export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
  
    @Post()
    create(@Body() createProjectDto: CreateProjectDto) {
      return this.projectService.create(createProjectDto);
    }
  
    @Get()
    findAll(@Query() query: ProjectQueryDto) {
      return this.projectService.findAll(query);
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.projectService.findOne(id);
    }
  
    @Patch(':id')
    update(
      @Param('id') id: string,
      @Body() updateProjectDto: UpdateProjectDto,
    ) {
      return this.projectService.update(id, updateProjectDto);
    }
  
    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.projectService.remove(id);
    }
  }