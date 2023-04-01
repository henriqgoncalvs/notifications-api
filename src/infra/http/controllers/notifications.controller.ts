import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from '@/application/use-cases/send-notification';
import { CreateNotificationBody } from '@/infra/http/dtos/create-notification-body';
import { NotificationViewModel } from '../view-models/notification-view-model';
import { CancelNotification } from '@/application/use-cases/cancel-notification';
import { ReadNotification } from '@/application/use-cases/read-notification';
import { UnreadNotification } from '@/application/use-cases/unread-notification';
import { CountRecipientNotification } from '@/application/use-cases/count-recipient-notification';
import { ListRecipientNotifications } from '@/application/use-cases/list-recipient-notifications';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private listRecipientNotifications: ListRecipientNotifications,
  ) {}

  @Patch('/:id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({ notificationId: id });
  }

  @Get('count/:recipientId')
  async countFromRecipient(@Param('recipientId') recipientId: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientId,
    });

    return { count };
  }

  @Get('from/:recipientId')
  async listFromRecipient(@Param('recipientId') recipientId: string) {
    const { notifications } = await this.listRecipientNotifications.execute({
      recipientId,
    });

    const notificationsHTTP = notifications.map(NotificationViewModel.toHTTP);

    return { notifications: notificationsHTTP };
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({ notificationId: id });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({ notificationId: id });
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientId, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientId,
      content,
      category,
    });

    const notificationHTTP = NotificationViewModel.toHTTP(notification);

    return { notification: notificationHTTP };
  }
}
