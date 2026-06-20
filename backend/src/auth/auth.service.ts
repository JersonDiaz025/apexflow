import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { UserSanitized } from '@/types/user/user-sanitized.type';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, pass: string): Promise<UserSanitized | null> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) return null;

    const isMatch = await bcrypt.compare(pass, user.password);
    if (isMatch) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: UserSanitized) {
    const payload = { email: user.email, sub: user.id };
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    };
  }
}
