import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
// typeorm
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// 实体
import { Picture } from './entity/picture.entity';
// 公共分页 dto
import { PageDTO } from 'src/common/dto/page.dto';
import { PictureCreateDTO } from './dto/picture.create.dto';
import { PictureListVO } from './vo/picture-list.vo';
// buffer 计算流
import { encryptFileMD5 } from 'src/utils/cryptogram.util';

// 公共分页
import { getPagination } from 'src/utils/index';
// 文件上传
import Config from 'src/config/index';

@Injectable()
export class PictureService {
  constructor(
    @InjectRepository(Picture)
    private readonly pictureRepository: Repository<Picture>,
  ) {}

  async getMany(pageDto: PageDTO) {
    const { page, pageSize } = pageDto;
    const getList = this.pictureRepository
      .createQueryBuilder('picture')
      .select(['picture.src'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = await getList;
    const pagination = getPagination(total, pageSize, page);
    return {
      list,
      pagination,
    };
  }

  async create(pictureCreateDTO: PictureCreateDTO) {
    const picture = new Picture();
    picture.src = pictureCreateDTO.src;
    picture.sign = pictureCreateDTO.sign;
    const result = await this.pictureRepository.save(picture);
    return {
      info: result,
    };
  }
  async getOneBySign(sign: string) {
    return await this.pictureRepository
      .createQueryBuilder('picture')
      .where('picture.sign = :sign', { sign })
      .getOne();
  }

  async upload(file: any) {
    const { buffer } = file;
    const currentSign = encryptFileMD5(buffer);
    const hasPicture = await this.getOneBySign(currentSign);
    if (hasPicture) {
      return {
        info: {
          src: hasPicture.src,
          isHas: true,
        },
      };
    }

    const arr = file.originalname.splict('.');
    const fileType = arr[arr.length - 1];
    const fileName = currentSign + '.' + fileType;
    fs.writeFileSync(`./upload/${fileName}`, buffer);

    const src = Config.SERVICE_CONFIG.uploadStaticSrc + fileName;
    this.create({ src, sign: currentSign });

    return {
      info: {
        src,
        isHas: false,
      },
    };
  }
}
