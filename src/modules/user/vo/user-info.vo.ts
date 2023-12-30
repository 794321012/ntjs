import { ApiProperty } from '@nestjs/swagger';

export class UserInfoItem {
  @ApiProperty({ description: '用户名', example: '张三' })
  id: number;

  @ApiProperty({ description: '创建时间', example: '2023-12-29' })
  createTime: Date;

  @ApiProperty({ description: '更新时间', example: '2023-12-29' })
  upDateTime: Date;

  @ApiProperty({ description: '手机号', example: '13871261111' })
  mobile;
}

export class UserInfoVO {
  @ApiProperty({ type: UserInfoItem })
  info;
}

export class UserInfoRespone {
  @ApiProperty({ type: UserInfoItem })
  code: number;

  @ApiProperty({
    description: '数据',
    type: () => UserInfoVO,
    example: UserInfoVO,
  })
  data: UserInfoVO;

  @ApiProperty({ description: '请求结果', example: '请求成功' })
  message: string;
}
