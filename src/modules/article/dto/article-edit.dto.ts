import { ArticleDTO } from './article.dto';
import { IdDTO } from '../../../common/dto/id.dto';
import { UpdateTagDto } from 'src/modules/tag/dto/update-tag.dto';
export class ArticleEditDTO implements IdDTO, ArticleDTO {
  id: number;
  title: string;
  content: string;
  description: string;
  tags?: UpdateTagDto[];
}
