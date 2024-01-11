import { CommonDTO } from 'src/common/dto/common.dto';
import { ArticleDTO } from '../dto/article.dto';
import { UpdateTagDto } from 'src/modules/tag/dto/update-tag.dto';
import { SuccessVO } from 'src/common/dto/success.vo';

export class ArticleInfoItem implements CommonDTO, ArticleDTO {
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

export class ArticleInfoVO {
  /**
   * 文章详情
   */
  info: ArticleInfoItem;
}

export class ArticleInfoSuccessVO extends SuccessVO {
  data: {
    info: ArticleInfoVO;
  };
}
