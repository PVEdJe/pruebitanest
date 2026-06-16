import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {

  constructor(
      @InjectRepository(Category)
      private categoryRepository: Repository<Category>,
      ) {}
      
  async create(createCategoryDto: CreateCategoryDto) {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll() {
    const categories = await this.categoryRepository.find();
    return categories;
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
        if (!category) {
          throw new NotFoundException(`No se encontro la categoria con el id: ${id} proporcionado`);
        }
        return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`No se encontro la categoria con el id: ${id} proporcionado`);
    }
    const updatedCategory = this.categoryRepository.merge(category, updateCategoryDto);
    await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number) {
    const category = await this.categoryRepository.findOneBy({ id });
    if (!category) {
      throw new NotFoundException(`No se encontro la categoria con el id: ${id} proporcionado`);
    }
    await this.categoryRepository.remove(category);
    return {
      message: `La categoria con el id: ${id} ha sido eliminada exitosamente`
    };
  }
}
