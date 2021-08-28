import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductService } from '../product/product.service';
import { UserService } from '../user/user.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';

@Injectable()
export class OrderService {
  constructor(
    private readonly userReposetory: UserService,
    private readonly productReposetory: ProductService,
    @InjectRepository(Order)
    private readonly orderReposetory: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const user = await this.userReposetory.findOne(createOrderDto.userId);
    const order = await this.orderReposetory.create();

    const productId = await Promise.all(
      createOrderDto.productId.map(
        async (id) => await this.productReposetory.findOne(id),
      ),
    );

    console.log(productId, user)

    order.productId = productId;
    order.userId = user;

    return await this.orderReposetory.save(order);
  }

  async findAll() {
    return await this.orderReposetory.find({relations: ['userId', 'productId']});
  }

  async findOne(id: number) {
    return await this.orderReposetory.findOne({ id });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  async remove(id: number) {
    return await this.orderReposetory.delete({ id });
  }
}
