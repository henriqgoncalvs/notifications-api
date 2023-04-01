import { Injectable } from '@nestjs/common';
import { PrismaService } from './infra/prisma.service';

@Injectable()
export class AppService {
  constructor(private readonly prisma: PrismaService) {}

  async getAll() {
    return await this.prisma.notification.findMany();
  }

  async create(data) {
    return await this.prisma.notification.create({ data });
  }
}
