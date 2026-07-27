import { Difficulty } from '@prisma/client';
import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsJSON,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateBugDto {
    @IsString()
    @MaxLength(150)
    title!: string;

    @IsString()
    @MaxLength(150)
    slug!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsJSON()
    learningObjectives?: string;

    @IsOptional()
    @IsString()
    expectedOutcome?: string;

    @IsEnum(Difficulty)
    difficulty!: Difficulty;

    @IsOptional()
    @IsInt()
    @Min(1)
    estimatedMinutes?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    points?: number;

    @IsInt()
    @Min(1)
    displayOrder!: number;

    @IsOptional()
    @IsBoolean()
    isPublished?: boolean;
}