import { PartialType } from '@nestjs/mapped-types';
import { CreateBugSnapshotDto } from './create-bug-snapshot.dto';

export class UpdateBugSnapshotDto extends PartialType(
    CreateBugSnapshotDto,
) { }