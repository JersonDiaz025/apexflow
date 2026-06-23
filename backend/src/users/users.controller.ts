import { UsersService } from '@/users/users.service';
import { USERS } from '@/constants/users.routes.constants';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { Controller, Request, Get, UseGuards, Query } from '@nestjs/common';

@Controller(USERS.BASE)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('search') search?: string) {
    return this.usersService.findAll(search);
  }

  @UseGuards(JwtAuthGuard)
  @Get(USERS.PROFILE)
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.userId);
  }
}
