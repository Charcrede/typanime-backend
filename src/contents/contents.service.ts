import { Injectable } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common';
import { CreateContentDto } from './dto/create-content.dto';
import { UpdateContentDto } from './dto/update-content.dto';
import { GetContentsDto } from './dto/get-contents.dto';
import { AppDataSource } from '../database/data-source';
import { Content } from './entities/content.entity';

@Injectable()
export class ContentsService {
  
  private readonly contentRepo = AppDataSource.getRepository(Content);
  contentRepository: any;

  async getContents(dto: GetContentsDto) {
    const take = 6; // 6 items par page
    const skip = ((dto.page ?? 1) - 1) * take;

    const [data, total] = await this.contentRepo.findAndCount({
      where: dto.categoryId ? { category: { id: dto.categoryId } } : {},
      relations: ['category'], // si tu veux inclure la catégorie
      take,
      skip,
      order: { id: 'ASC' }, // tri optionnel
    });

    const totalPages = Math.ceil(total / take);

    return {
      data,
      meta: {
        total,
        page: dto.page ?? 1,
        totalPages,
      },
    };
  }
  create(createContentDto: CreateContentDto) {
    return 'This action adds a new content';
  }

  findAll() {
    return `This action returns all contents`;
  }

async findOne(id: number) {
  const content = await this.contentRepo.findOne({
    where: { id },
    relations: ['category', 'games', 'challenges'],
  });

  if (!content) {
    throw new NotFoundException(`Content with id ${id} not found`);
  }

  return content;
}

  update(id: number, updateContentDto: UpdateContentDto) {
    return `This action updates a #${id} content`;
  }

  remove(id: number) {
    return `This action removes a #${id} content`;
  }
}
