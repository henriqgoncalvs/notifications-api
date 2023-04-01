import { Body, Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { AppService } from '../app.service';
import { CreateNotificationBody } from './create-notification-body';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async get() {
    return await this.appService.getAll();
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    return await this.appService.create({
      id: randomUUID(),
      recipientId,
      content,
      category,
    });
  }
}
