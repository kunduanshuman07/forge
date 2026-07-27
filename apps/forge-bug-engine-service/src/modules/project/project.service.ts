import {
    BadRequestException,
    Injectable,
    NotFoundException,
  } from '@nestjs/common';
  import { PrismaService } from '../../prisma/prisma.service';
  import { CreateProjectDto } from './dto/create-project.dto';
  import { UpdateProjectDto } from './dto/update-project.dto';
  import { ProjectQueryDto } from './dto/project-query.dto';
  
  @Injectable()
  export class ProjectService {
    constructor(private readonly prisma: PrismaService) {}
  
    async create(createProjectDto: CreateProjectDto) {
      const existingProject = await this.prisma.project.findFirst({
        where: {
          OR: [
            { slug: createProjectDto.slug },
            { displayOrder: createProjectDto.displayOrder },
          ],
        },
      });
  
      if (existingProject) {
        throw new BadRequestException(
          'Project with the same slug or display order already exists.',
        );
      }
  
      return this.prisma.project.create({
        data: createProjectDto,
      });
    }
  
    async findAll(query: ProjectQueryDto) {
      const {
        page = 1,
        limit = 10,
        search,
        category,
        difficulty,
        framework,
        language,
        isPublished,
      } = query;
  
      const where: any = {};
  
      if (search) {
        where.OR = [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            shortDescription: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ];
      }
  
      if (category) where.category = category;
      if (difficulty) where.difficulty = difficulty;
      if (framework) where.framework = framework;
      if (language) where.language = language;
      if (typeof isPublished === 'boolean')
        where.isPublished = isPublished;
  
      const [projects, total] = await this.prisma.$transaction([
        this.prisma.project.findMany({
          where,
          skip: (page - 1) * limit,
          take: limit,
          orderBy: {
            displayOrder: 'asc',
          },
        }),
        this.prisma.project.count({
          where,
        }),
      ]);
  
      return {
        data: projects,
        pagination: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
      };
    }
  
    async findOne(id: string) {
      const project = await this.prisma.project.findUnique({
        where: {
          id,
        },
      });
  
      if (!project) {
        throw new NotFoundException('Project not found.');
      }
  
      return project;
    }
  
    async update(id: string, updateProjectDto: UpdateProjectDto) {
      await this.findOne(id);
  
      return this.prisma.project.update({
        where: {
          id,
        },
        data: updateProjectDto,
      });
    }
  
    async remove(id: string) {
      await this.findOne(id);
  
      await this.prisma.project.delete({
        where: {
          id,
        },
      });
  
      return {
        message: 'Project deleted successfully.',
      };
    }
  }