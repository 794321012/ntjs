import { Common } from 'src/common/entity/common.entity';
import { Article } from 'src/modules/article/entity/article.entity';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
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
