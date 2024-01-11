import { Injectable, NotFoundException } from '@nestjs/common';
import { ArticleCreateDTO } from './dto/article-create.dto';
import { ArticleEditDTO } from './dto/article-edit.dto';
import { IdDTO } from 'src/common/dto/id.dto';
import { ArticleListDTO } from './dto/article-list.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './entity/article.entity';
import { getPagination } from 'src/utils';
@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  //获取文章列表
  async getMore(articleListDTO: ArticleListDTO) {
    const { page = 1, pageSize = 10 } = articleListDTO;
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: false })
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();

    const [list, total] = await getList;
    const pagination = getPagination(page, pageSize, total);
    return {
      list,
      pagination,
    };
  }

  async getMoreByTagId(articleListDTO: ArticleListDTO) {
    const { page = 1, pageSize = 10, tagId } = articleListDTO;
    const getList = this.articleRepository
      .createQueryBuilder('article')
      .where({ isDelete: 0 })
      .andWhere('tag.id = :id', { id: tagId })
      .andWhere('article.isDelete = 0')
      .leftJoinAndSelect('article.tag', 'tag')
      .select([
        'article.id',
        'article.title',
        'article.description',
        'article.createTime',
        'article.updateTime',
      ])
      .addSelect(['tag.id', 'tag.name'])
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .getManyAndCount();
    const [list, total] = await getList;
    const pagination = getPagination(page, pageSize, total);
    return {
      list,
      pagination,
    };
  }

  // 获取文章详情
  async getOne(idDTO: IdDTO) {
    const { id } = idDTO;
    const articleDetail = await this.articleRepository
      .createQueryBuilder('article')
      .where('article.id', { id })
      .getOne();

    if (!articleDetail) {
      throw new NotFoundException('找不到文章');
    }
    return {
      info: articleDetail,
    };
  }

  //创建文章
  async create(articleCreateDTO: ArticleCreateDTO) {
    const article = new Article();
    article.title = articleCreateDTO.title;
    article.description = articleCreateDTO.description;
    article.content = articleCreateDTO.content;
    const result = await this.articleRepository.save(article);
    return {
      info: result,
    };
  }
  // 更新文章
  async update(articleEditDTO: ArticleEditDTO) {
    const { id } = articleEditDTO;
    const articleToUpdate = await this.articleRepository.findOneBy({ id });
    articleToUpdate.title = articleEditDTO.title;
    articleToUpdate.description = articleEditDTO.description;
    articleToUpdate.content = articleEditDTO.content;
    const result = await this.articleRepository.save(articleToUpdate);
    return { info: result };
  }
  // 删除文章
  async delete(idDTO: IdDTO) {
    const { id } = idDTO;
    const articleToUpdate = await this.articleRepository.findOneBy({ id }); // id
    articleToUpdate.isDelete = true;
    const result = await this.articleRepository.save(articleToUpdate);
    return { info: result };
  }
}
