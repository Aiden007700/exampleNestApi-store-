import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userReposetory: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findOneByEmail(createUserDto.email)) {
      throw new BadRequestException('user alredy exists');
    }
    const user = this.userReposetory.create(createUserDto);
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
    return await this.userReposetory.save(user);
  }

  async findAll() {
    return await this.userReposetory.find();
  }

  async findOne(id: number) {
    return await this.userReposetory.findOne({ id });
  }

  async findOneByEmail(email: string) {
    return await this.userReposetory.findOne({ email });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const _user = await this.userReposetory.findOne({ id });
    return await this.userReposetory.save({
      ..._user,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    return await this.userReposetory.delete({ id });
  }
}
