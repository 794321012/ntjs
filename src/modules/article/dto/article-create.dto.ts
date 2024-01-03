// src/modules/article/dto/article-create.dto.ts

import { IsNotEmpty } from 'class-validator';
import { Tag } from 'src/modules/tag/entities/tag.entity';

export class ArticleCreateDTO {
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string;

  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;

  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string;

  /**
   * 标签 格式 [{id: 1}, {id: 2}]
   * @example [{id: 1}]
   */
  readonly tags?: Tag[];
}
