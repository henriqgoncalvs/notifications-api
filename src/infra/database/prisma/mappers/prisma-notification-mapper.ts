import { Notification as NotificationPrisma } from '@prisma/client';
import { Notification } from '@/application/entities/notification';
import { Content } from '@/application/entities/notification-content';

export class PrismaNotificationMapper {
  static toPrisma(notification: Notification) {
    return {
      id: notification.id,
      content: notification.content.value,
      category: notification.category,
      recipientId: notification.recipientId,
      readAt: notification.readAt,
      createdAt: notification.createdAt,
      canceledAt: notification.canceledAt,
    };
  }

  static toDomain(notificationPrisma: NotificationPrisma): Notification {
    return new Notification(
      {
        content: new Content(notificationPrisma.content),
        category: notificationPrisma.category,
        recipientId: notificationPrisma.recipientId,
        readAt: notificationPrisma.readAt,
        createdAt: notificationPrisma.createdAt,
        canceledAt: notificationPrisma.canceledAt,
      },
      notificationPrisma.id,
    );
  }
}
