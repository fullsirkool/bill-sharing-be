import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async findByEmail(email: string): Promise<User> {
    try {
      return await this.prismaService.user.findUnique({ where: { email } });
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async findByCapcha(capcha: string): Promise<User> {
    try {
      return await this.prismaService.user.findFirst({ where: { capcha } });
    } catch (error) {
      throw new Error(error.message);
    }
  }
}
