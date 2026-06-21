import { AuthService } from '@/auth/auth.service';
import { UsersService } from '@/users/users.service';
import { AUTH } from '@/constants/auth.routes.constants';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { LoginResponseDto } from './dto/login-response.dto';
import { LocalAuthGuard } from '@/auth/guards/local-auth.guard';
import { Controller, Request, Post, UseGuards, Body } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Controller(AUTH.BASE)
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UsersService
  ) {}

  @Post(AUTH.REGISTER)
  register(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @UseGuards(LocalAuthGuard)
  @Post(AUTH.LOGIN)
  async login(@Request() req: LoginDto) {
    return this.authService.login((req as any).user);
  }
}
