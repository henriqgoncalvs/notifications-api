import { Module } from '@nestjs/common';
import { SendNotification } from '@/application/use-cases/send-notification';
import { DatabaseModule } from '@/infra/database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@/application/use-cases/cancel-notification';
import { CountRecipientNotification } from '@/application/use-cases/count-recipient-notification';
import { ListRecipientNotifications } from '@/application/use-cases/list-recipient-notifications';
import { ReadNotification } from '@/application/use-cases/read-notification';
import { UnreadNotification } from '@/application/use-cases/unread-notification';

@Module({
  imports: [DatabaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    CountRecipientNotification,
    ListRecipientNotifications,
    ReadNotification,
    UnreadNotification,
  ],
})
export class HttpModule {}
