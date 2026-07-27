import { Difficulty } from '@prisma/client';
import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class BugQueryDto {
    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsEnum(Difficulty)
    difficulty?: Difficulty;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    page = 1;

    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    limit = 10;

    @IsOptional()
    @IsString()
    projectId?: string;

    @IsOptional()
    @Type(() => Boolean)
    @IsBoolean()
    isPublished?: boolean;
}