import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { SignInDto } from './dto/signIn.dto';
import { SignUpDto } from './dto/signUp.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto) {
    const user = await this.userService.create(signUpDto);
    return user;
  }

  async signIn(user) {
    const payload = { id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(signInDto: SignInDto) {
    const user = await this.userService.findOneByEmail(signInDto.email);
    if (user && (await bcrypt.compare(signInDto.password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
