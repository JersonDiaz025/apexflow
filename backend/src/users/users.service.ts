import * as bcrypt from 'bcrypt';
import { User } from 'generated/prisma/client';
import { userSelect } from '@/prisma/user.select';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from '@/users/dto/create-user.dto';
import { Injectable, ConflictException } from '@nestjs/common';
import { getAvatarInitials } from '@/utils/avatar.util';

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

    const user = await this.prisma.user.create({
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

  // Get all users
  async findAll(search?: string) {
    const whereCondition = search
      ? {
          OR: [
            { name: { contains: search, mode: 'insensitive' as const } },
            { email: { contains: search, mode: 'insensitive' as const } },
          ],
        }
      : {};

    const users = await this.prisma.user.findMany({
      where: whereCondition,
      select: userSelect,
    });

    return users.map((user) => ({
      ...user,
      avatar: getAvatarInitials(user?.name, 2),
    }));
  }

  // Find user by email
  async findOneByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  // Find user by id
  async findById(id: string) {
    const dataUser = await this.prisma.user.findUnique({
      where: { id: id },
      select: userSelect,
    });
    if (!dataUser) return null;

    return {
      ...dataUser,
      avatar: getAvatarInitials(dataUser?.name, 2),
    };
  }
}
