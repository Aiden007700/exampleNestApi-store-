import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { SignUpDto } from './dto/signUp.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signIn')
  @UseGuards(AuthGuard('local'))
  async signIn(@Req() req) {
    return this.authService.signIn(req.user)
  }

  @Post('signUp')
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto)
  }

}
