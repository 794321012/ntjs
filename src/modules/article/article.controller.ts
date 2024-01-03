import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Query,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from './dto/id.dto';
import { ListDTO } from './dto/list.dto';

@Controller('article')
export class ArticleController {
  constructor(
    private readonly articleService: ArticleService, //
  ) {}

  @Get('list')
  async getMore(@Query() listDTO: ListDTO) {
    // 여기서 리스트 가져오는 로직
    // 리턴 값은 아래와 같이 리턴
    const { tagId } = listDTO;
    if (tagId) {
      return await this.articleService.getMoreByTagId(listDTO);
    }
    return await this.articleService.getMore(listDTO);
  }

  @Get('info')
  getOne(@Query() idDTO: IdDTO) {
    return this.articleService.getOne(idDTO);
  }

  @Post('create')
  create(@Body() articleCreateDTO: ArticleCreateDTO) {
    return this.articleService.create(articleCreateDTO);
  }

  @Put('edit')
  update(@Body() articleEditDTO: ArticleEditDTO) {
    return this.articleService.update(articleEditDTO);
  }

  @Delete('delete')
  delete(@Body() idDTO: IdDTO) {
    return this.articleService.delete(idDTO);
  }
}
