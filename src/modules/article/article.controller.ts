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
import { Article } from './interface/article.interface';
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
  getMore(@Query() listDTO: ListDTO) {
    console.log(listDTO, 'debugger');
    return this.articleService.getMore(listDTO);
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
