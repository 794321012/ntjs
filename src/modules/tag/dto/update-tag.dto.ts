import { IdDTO } from 'src/common/dto/id.dto';
import { TagDTO } from './tag.dto';

export class UpdateTagDto implements IdDTO, TagDTO {
  id: number;
  label: string;
}
