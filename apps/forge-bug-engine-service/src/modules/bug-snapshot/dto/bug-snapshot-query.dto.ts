import { Type } from 'class-transformer';
import {
    IsInt,
    IsOptional,
    IsString,
    Min,
} from 'class-validator';

export class BugSnapshotQueryDto {
    @IsOptional()
    @IsString()
    bugId?: string;

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
}