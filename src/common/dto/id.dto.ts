import { IsNotEmpty, Matches } from 'class-validator';
import { regPositive } from 'src/utils/regx.util';
export class IdDTO {
  /**
   * 主键 id
   */
  @IsNotEmpty()
  @Matches(regPositive, { message: 'id必须是正整数' })
  id: number;
}
