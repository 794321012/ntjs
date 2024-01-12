import { IsNotEmpty } from 'class-validator';
export class TagDTO {
  /**
   * 标签名称
   * @example 标签1
   */
  @IsNotEmpty({ message: '标签名不能为空' })
  label: string;
}
