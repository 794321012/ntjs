// 公共实体
import { Common } from 'src/common/entity/common.entity';
// 实体
import { Article } from 'src/modules/article/entity/article.entity';
// 装饰器
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
// 校验器
import { IsNotEmpty } from 'class-validator';
@Entity()
export class Tag extends Common {
  // 标签名称
  @Column()
  @IsNotEmpty()
  label: string;

  // 文章
  @ManyToMany(() => Article, (article) => article.tags)
  @JoinTable()
  articles: Article[];
}
