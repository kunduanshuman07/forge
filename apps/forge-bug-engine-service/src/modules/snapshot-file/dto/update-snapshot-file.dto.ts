import { PartialType } from '@nestjs/mapped-types';
import { CreateSnapshotFileDto } from './create-snapshot-file.dto';

export class UpdateSnapshotFileDto extends PartialType(
    CreateSnapshotFileDto,
) { }