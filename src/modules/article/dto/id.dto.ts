// src/modules/article/dto/id.dto.ts

import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regx.util';
export class IdDTO {
  @Matches(regPositive, { message: '请输入有效 id' })
  @IsNotEmpty({ message: 'id 不能为空' })
  readonly id: number;
}
