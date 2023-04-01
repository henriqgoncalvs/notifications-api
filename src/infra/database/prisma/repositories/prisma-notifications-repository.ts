import { Injectable } from '@nestjs/common';
import { Notification } from '@/application/entities/notification';
import { NotificationsRepository } from '@/application/repositories/notifications-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationsRepository implements NotificationsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(notification: Notification): Promise<void> {
    const notificationPrisma = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: notificationPrisma,
    });
  }

  async findById(notificationId: string): Promise<Notification | null> {
    const notificationPrisma = await this.prismaService.notification.findUnique(
      {
        where: { id: notificationId },
      },
    );

    if (!notificationPrisma) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notificationPrisma);
  }

  async findManyByRecipientId(recipientId: string): Promise<Notification[]> {
    const notifications = await this.prismaService.notification.findMany({
      where: { recipientId },
    });

    return notifications.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientId: string): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: { recipientId },
    });

    return count;
  }

  async save(notification: Notification): Promise<void> {
    const notificationPrisma = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.update({
      where: { id: notificationPrisma.id },
      data: notificationPrisma,
    });
  }
}
