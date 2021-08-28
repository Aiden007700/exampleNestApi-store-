import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productReposetory: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const product = await this.productReposetory.create(createProductDto);
    return await this.productReposetory.save(product);
  }

  async findAll() {
    return await this.productReposetory.find();
  }

  async findOne(id: number) {
    return await this.productReposetory.findOne({ id });
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const _product = await this.productReposetory.findOne({ id });
    return await this.productReposetory.save({
      ..._product,
      ...updateProductDto,
    });
  }

  async remove(id: number) {
    return await this.productReposetory.delete({id});
  }
}
