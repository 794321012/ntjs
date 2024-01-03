import { Injectable, NotFoundException } from '@nestjs/common';
//typeorm
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// entity
import { Tag } from './entities/tag.entity';
// dto
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
// vo
import { TagInfoVO } from './vo/tag-info.vo';
import { TagListVO } from './vo/tag-list.vo';
import { IdDTO } from '../article/dto/id.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  /**
   * 获取更多数据
   */
  async getMore(): Promise<TagListVO> {
    const getList = this.tagRepository
      .createQueryBuilder('tag')
      .where({ isDelete: false })
      .select(['tag.id', 'tag.label'])
      .getMany();
    // const result = await getList;
    return {
      list: await getList,
    };
  }

  async create(createTagDto: CreateTagDto): Promise<TagInfoVO> {
    const { label } = createTagDto; // 请求参数中去取出标签
    const hasTag = await this.tagRepository.findOneBy({ label }); //使用标签查是否存在
    if (hasTag) {
      throw new NotFoundException(`${hasTag}标签已经存在`);
    }
    const tag = new Tag();
    tag.label = label;
    const result = await this.tagRepository.save(tag); // 存库
    return {
      info: result,
    };
  }

  async update(updateTagDto: UpdateTagDto): Promise<TagInfoVO> {
    const { id, label } = updateTagDto;
    const findTag = await this.tagRepository.findOneBy({ id });
    findTag.label = label;
    const result = await this.tagRepository.save(findTag);
    return { info: result };
  }

  /**
   * 删除标签
   * @param idDTO 索引
   * @returns TagInfoVO
   */
  async delete(idDTO: IdDTO): Promise<TagInfoVO> {
    const { id } = idDTO;
    const tag = await this.tagRepository.findOneBy({ id });
    tag.isDelete = true;
    const result = await this.tagRepository.save(tag);
    return {
      info: result,
    };
  }
}
