import { IsNotEmpty } from 'class-validator';

export class PictureDTO {
  /**
   * 图片路劲
   * @example /upload/static/1.jpg
   */
  @IsNotEmpty({ message: '请输入图片路劲' })
  readonly src: string;
}
