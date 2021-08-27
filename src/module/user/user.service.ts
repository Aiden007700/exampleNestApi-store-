import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'

@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userReposetory: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new BadRequestException('user alredy exists')
    }
    const user = this.userReposetory.create(createUserDto)
    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(user.password, salt)
    user.password = hash
    return await this.userReposetory.save(user)
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async findOneByEmail(email: string) {
    return await this.userReposetory.findOne({email});
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
