import { Module } from '@nestjs/common';
import { UserModule } from './module/user/user.module';
import { ProductModule } from './module/product/product.module';
import { OrderModule } from './module/order/order.module';
import { AuthModule } from './module/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './module/user/entities/user.entity';
import { Order } from './module/order/entities/order.entity';
import { Product } from './module/product/entities/product.entity';

@Module({
  imports: [UserModule, ProductModule, OrderModule, AuthModule, TypeOrmModule.forRoot({
    type: 'sqlite',
    database: 'database.db',
    entities: [User, Order, Product],
    synchronize: true
  })],
  controllers: [],
  providers: [],
})
export class AppModule {}
