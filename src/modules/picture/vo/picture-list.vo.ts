import { SuccessVO } from 'src/common/dto/success.vo';
import { PictureDTO } from '../dto/picture.dto';
import { PaginationDTO } from 'src/common/dto/pagination.dto';

export class PictureLstItem extends PictureDTO {}

// 返回 info 信息
export class PictureListVO {
  list: PictureLstItem[];
  pagination: PaginationDTO;
}

export class PictureListSuccessVO extends SuccessVO {
  data: {
    list: PictureLstItem[];
    pagination: PaginationDTO;
  };
}
