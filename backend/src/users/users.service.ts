import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma/client';
import { userSelect } from '@/prisma/user.select';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Injectable, ConflictException } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  // Create a new user
  async create(data: CreateUserDto) {
    const exists = await this.findOneByEmail(data.email);
    if (exists) {
      throw new ConflictException('El correo ya existe en el sistema.');
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(data.password, salt);

    const user = this.prisma.user.create({
      data: {
        email: data.email,
        name: data.name,
        password: hashedPassword,
      },
      select: userSelect,
    });
    return {
      success: true,
      message: `¡Bienvenido, ${user.name}! Tu cuenta en ApexFlow ha sido creada con éxito.`,
    };
  }

  // Find user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Find user by id
  async findById(id: string) {
    return this.prisma.user.findUnique({
      where: { id: id },
      select: userSelect,
    });
  }
}
