import { tagDTO } from '../dto/tag.dto';
export class TagListVO {
  list: tagDTO[];
}
export class TagListSuccessVO {
  data: TagListVO;
}
