import { IntersectionType, PartialType } from '@nestjs/swagger';
import { IdDTO } from 'src/common/dto/id.dto';
import { TagDTO } from './tag.dto';

export class UpdateTagDto extends IntersectionType(
  IdDTO,
  PartialType(TagDTO),
) {}
