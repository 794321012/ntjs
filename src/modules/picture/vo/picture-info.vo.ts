import { SuccessVO } from 'src/common/dto/success.vo';
import { PictureDTO } from '../dto/picture.dto';

export class PictureInfoItem extends PictureDTO {}

// 返回 info 信息
export class PictureInfoVO {
  info: PictureInfoItem;
}

export class PictureInfoSuccessVO extends SuccessVO {
  data: {
    info: PictureInfoItem;
  };
}
