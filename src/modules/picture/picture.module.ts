import { Module } from '@nestjs/common';
import { PictureController } from './picture.controller';
import { PictureService } from './picture.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Picture } from './entity/picture.entity';
@Module({
  // module 文件引入实体
  imports: [TypeOrmModule.forFeature([Picture])],
  controllers: [PictureController],
  providers: [PictureService],
})
export class PictureModule {}
