import {
    Difficulty,
    Framework,
    ProgrammingLanguage,
  } from '@prisma/client';
  import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
  } from 'class-validator';
  import { Type } from 'class-transformer';
  
  export class ProjectQueryDto {
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page?: number = 1;
  
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(100)
    limit?: number = 10;
  
    @IsOptional()
    @IsString()
    search?: string;
  
    @IsOptional()
    @IsString()
    category?: string;
  
    @IsOptional()
    @IsEnum(Difficulty)
    difficulty?: Difficulty;
  
    @IsOptional()
    @IsEnum(ProgrammingLanguage)
    language?: ProgrammingLanguage;
  
    @IsOptional()
    @IsEnum(Framework)
    framework?: Framework;
  
    @IsOptional()
    @Type(() => Boolean)
    isPublished?: boolean;
  }