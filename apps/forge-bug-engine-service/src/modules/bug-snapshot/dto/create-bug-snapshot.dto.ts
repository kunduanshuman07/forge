import { Runtime } from '@prisma/client';
import {
    IsEnum,
    IsInt,
    IsNumber,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateBugSnapshotDto {
    @IsEnum(Runtime)
    runtime!: Runtime;

    @IsOptional()
    @IsString()
    @MaxLength(100)
    dockerImage?: string;

    @IsOptional()
    @IsString()
    @MaxLength(50)
    nodeVersion?: string;

    @IsOptional()
    @IsString()
    installCommand?: string;

    @IsOptional()
    @IsString()
    buildCommand?: string;

    @IsOptional()
    @IsString()
    startCommand?: string;

    @IsOptional()
    @IsString()
    testCommand?: string;

    @IsOptional()
    @IsString()
    entryPoint?: string;

    @IsOptional()
    @IsInt()
    @Min(1)
    memoryLimitMb?: number;

    @IsOptional()
    @IsNumber()
    @Min(0.1)
    cpuLimit?: number;
}