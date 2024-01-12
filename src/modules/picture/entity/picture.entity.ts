import { Common } from 'src/common/entity/common.entity';
import { Entity, Column } from 'typeorm';
@Entity()
export class Picture extends Common {
  // 图片地址
  @Column('text')
  src: string;
  // 图片签名
  @Column('text')
  sign: string;
}
