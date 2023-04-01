import { Injectable } from '@nestjs/common';
import { Notification } from '@/application/entities/notification';
import { Content } from '@/application/entities/notification-content';
import { NotificationsRepository } from '@/application/repositories/notifications-repository';

interface SendNotificationRequest {
  recipientId: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationsRepository: NotificationsRepository) {}

  async execute(
    request: SendNotificationRequest,
  ): Promise<SendNotificationResponse> {
    const { category, content, recipientId } = request;

    const notification = new Notification({
      recipientId,
      content: new Content(content),
      category,
    });

    // Persist the notification in DB
    await this.notificationsRepository.create(notification);

    return {
      notification,
    };
  }
}
