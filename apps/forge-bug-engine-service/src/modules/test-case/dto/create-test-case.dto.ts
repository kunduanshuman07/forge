import { TestCaseType } from '@prisma/client';
import {
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateTestCaseDto {
    @IsString()
    @MaxLength(255)
    name!: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsEnum(TestCaseType)
    type!: TestCaseType;

    @IsString()
    command!: string;

    @IsOptional()
    @IsString()
    expectedOutput?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    timeoutSeconds?: number;

    @IsOptional()
    @IsInt()
    @Min(0)
    points?: number;

    @IsInt()
    @Min(1)
    displayOrder!: number;
}