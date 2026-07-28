import {
    IsNotEmpty,
    IsString,
} from 'class-validator';

export class UpdateSubmissionFileDto {
    @IsString()
    @IsNotEmpty()
    content!: string;
}