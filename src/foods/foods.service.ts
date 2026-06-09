import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFoodDto } from './dto/create-food.dto';
import { UpdateFoodDto } from './dto/update-food.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FoodsService {

  constructor(
    @InjectRepository(Food)
    private foodRepository: Repository<Food>,
    ) {}

  async create(createFoodDto: CreateFoodDto) {
    const food = this.foodRepository.create(createFoodDto);
    return this.foodRepository.save(food);
  }

  async findAll() {
    const foods = await this.foodRepository.find();
    return foods;
  }

  async findOne(id: number) {
    const food = await this.foodRepository.findOneBy({ id });
    //const food = await this.foodRepository.findOne({ where: { id } });
    if (!food) {
      throw new NotFoundException(`No se encontro la comida con el id: ${id} proporcionado`);
    }
    return food;
  }

  async update(id: number, updateFoodDto: UpdateFoodDto) {
    const food = await this.foodRepository.findOneBy({ id });
    if (!food) {
      throw new NotFoundException(`No se encontro la comida con el id: ${id} proporcionado`);
    }
    const updatedFood = this.foodRepository.merge(food, updateFoodDto);
    await this.foodRepository.save(updatedFood);
    //await this.foodRepository.update({ id }, updateFoodDto);
    //return this.findOne(id);
  }

  async remove(id: number) {
    const food = await this.foodRepository.findOneBy({ id })
    if (!food) {
      throw new NotFoundException(`No se encontro la comida con el id: ${id} proporcionado`);
    }
    await this.foodRepository.delete(id);
    return {
      message: `La comida con el id: ${id} ha sido eliminada exitosamente`
    };
  }
  
}