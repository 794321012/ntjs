import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { TagService } from './tag.service';

// 守卫
import { AuthGuard } from '@nestjs/passport';
// dto
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { IdDTO } from 'src/common/dto/id.dto';
// vo
import { TagInfoVO, TagInfoSuccessVO } from './vo/tag-info.vo';
import { TagListVO, TagListSuccessVO } from './vo/tag-list.vo';
// @ApiTags('标签模块')
@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get('list')
  getMore(): Promise<TagListVO> {
    return this.tagService.getMore();
  }

  @UseGuards(AuthGuard('jwt')) // 守卫
  @Post('create')
  create(@Body() createTagDto: CreateTagDto): Promise<TagInfoVO> {
    return this.tagService.create(createTagDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('update')
  update(@Body() updateTagDto: UpdateTagDto): Promise<TagInfoVO> {
    return this.tagService.update(updateTagDto);
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('delete')
  delete(@Body() idDto: IdDTO): Promise<TagInfoVO> {
    return this.tagService.delete(idDto);
  }
}
