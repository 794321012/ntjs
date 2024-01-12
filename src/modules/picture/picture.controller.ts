import { Controller, Get, Query, Post, UploadedFile } from '@nestjs/common';
import { PictureService } from './picture.service';
import { PageDTO } from 'src/common/dto/page.dto';
import { PictureListVO } from './vo/picture-list.vo';
@Controller('picture')
export class PictureController {
  constructor(private readonly pictureService: PictureService) {}

  @Get('list')
  async getMany(@Query() pageDTO: PageDTO): Promise<PictureListVO> {
    return await this.pictureService.getMany(pageDTO);
  }

  @Post('upload')
  async upload(@UploadedFile() file: any): Promise<any> {
    return this.pictureService.upload(file);
  }
}
