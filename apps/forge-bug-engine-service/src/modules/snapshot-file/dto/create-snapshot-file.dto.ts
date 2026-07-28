import {
    FileType,
    ProgrammingLanguage,
} from '@prisma/client';
import {
    IsBoolean,
    IsEnum,
    IsInt,
    IsOptional,
    IsString,
    MaxLength,
    Min,
} from 'class-validator';

export class CreateSnapshotFileDto {
    @IsString()
    @MaxLength(500)
    path!: string;

    @IsString()
    @MaxLength(255)
    name!: string;

    @IsOptional()
    @IsString()
    @MaxLength(20)
    extension?: string;

    @IsOptional()
    @IsEnum(ProgrammingLanguage)
    language?: ProgrammingLanguage;

    @IsEnum(FileType)
    type!: FileType;

    @IsString()
    content!: string;

    @IsOptional()
    @IsBoolean()
    isEditable?: boolean;

    @IsOptional()
    @IsBoolean()
    isHidden?: boolean;

    @IsInt()
    @Min(1)
    displayOrder!: number;
}