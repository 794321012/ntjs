import { CommonDTO } from 'src/common/dto/common.dto';
import { ArticleDTO } from '../dto/article.dto';
import { UpdateTagDto } from 'src/modules/tag/dto/update-tag.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';
export class ArticleListItem implements CommonDTO, ArticleDTO {
  createTime: Date;
  updateTime: Date;
  isDelete: boolean;
  version: number;
  id: number;
  title: string;
  description: string;
  content: string;
  tags?: UpdateTagDto[];
}

export class ArticleListVO extends ArticleListItem {
  list: ArticleListItem[];
  pagingation: PaginationDTO;
}

export class ArticleListSuccessVO extends ArticleListVO {
  /**
   * 返回的数据
   */
  data: {
    list: ArticleListItem[];
    pagingation: PaginationDTO;
  };
}
