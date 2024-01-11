// src/modules/article/dto/article-create.dto.ts

import { IsNotEmpty } from 'class-validator';
import { UpdateTagDto } from 'src/modules/tag/dto/update-tag.dto';

export class ArticleDTO {
  /**
   * 文章标题
   */
  @IsNotEmpty({ message: '请输入文章标题' })
  readonly title: string;

  /**
   * 文章描述
   */
  @IsNotEmpty({ message: '请输入文章描述' })
  readonly description: string;

  /**
   * 文章内容
   */
  @IsNotEmpty({ message: '请输入文章内容' })
  readonly content: string;

  /**
   * 标签 格式 [{id: 1}, {id: 2}]
   */
  readonly tags?: UpdateTagDto[];
}
