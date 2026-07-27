import {
    Difficulty,
    Framework,
    ProgrammingLanguage,
  } from '@prisma/client';
  import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    IsUrl,
    MaxLength,
    Min,
  } from 'class-validator';
  
  export class CreateProjectDto {
    @IsString()
    @MaxLength(100)
    title!: string;
  
    @IsString()
    @MaxLength(100)
    slug!: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(200)
    shortDescription?: string;
  
    @IsOptional()
    @IsString()
    description?: string;
  
    @IsString()
    @MaxLength(100)
    category!: string;
  
    @IsEnum(ProgrammingLanguage)
    language!: ProgrammingLanguage;
  
    @IsEnum(Framework)
    framework!: Framework;
  
    @IsEnum(Difficulty)
    difficulty!: Difficulty;
  
    @IsOptional()
    @IsInt()
    @Min(1)
    estimatedHours?: number;
  
    @IsOptional()
    @IsUrl()
    thumbnailUrl?: string;
  
    @IsOptional()
    @IsUrl()
    bannerUrl?: string;
  
    @IsOptional()
    @IsUrl()
    iconUrl?: string;
  
    @IsInt()
    @Min(1)
    displayOrder!: number;
  
    @IsOptional()
    @IsBoolean()
    isPublished?: boolean;
  }