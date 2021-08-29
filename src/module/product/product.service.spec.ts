import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { getRepository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductService } from './product.service';

import { Connection, Repository } from 'typeorm'
import { createMemDB } from '../../utils/testing-helpers/createMemDB';


describe('ProductService', () => {
  let db: Connection
  let productRepository: Repository<Product>
  let service: ProductService;

  beforeAll(async () => {
    db = await createMemDB([Product])
    productRepository = await db.getRepository(Product)
  })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProductService,
        {
          provide: getRepositoryToken(Product),
          useValue: productRepository
        },
      ],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  afterAll(() => db.close())

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('shuld create product1', async () => {
    const product = await service.create({name: 'iphone', price: 399})
    expect(product.id).toBe(1)
  })

  it('shuld create product2', async () => {
    const product = await service.create({name: 'mac', price: 599})
    expect(product.id).toBe(2)
  })

  it('shuld get all products', async () => {
    const productList = await service.findAll()
    expect(productList.length).toBe(2)
  })

  it('shuld fins product by id', async () => {
    const product = await service.findOne(1) 
    expect(product.id).toBe(1)
  })

  it('shuld update product', async () => {
    const updatedProduct = await service.update(1, {price: 1000})
    expect(updatedProduct.id).toBe(1)
    expect(updatedProduct.price).toBe(1000)
  })

  it('shuld delete all', async () => {
    service.remove(2)
    expect(await (await service.findAll()).length).toBe(1)
    service.remove(1)
    expect(await (await service.findAll()).length).toBe(0)
  })


});
