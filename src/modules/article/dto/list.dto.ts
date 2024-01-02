import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';
import { regPositive } from 'src/utils/regx.util';
export class ListDTO {
  @ApiProperty({
    description: '页码',
    example: 1,
  })
  // 验证规则
  @Matches(regPositive, { message: 'page 不可小于 0' })
  readonly page?: number;

  @ApiProperty({
    description: '每页数量',
    example: 10,
  })
  @Matches(regPositive, { message: 'pageSize 不可小于 0' })
  readonly pageSize?: number;
}
