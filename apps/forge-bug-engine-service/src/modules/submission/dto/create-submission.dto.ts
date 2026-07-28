import { IsString } from 'class-validator';

export class CreateSubmissionDto {
    @IsString()
    bugId!: string;
}