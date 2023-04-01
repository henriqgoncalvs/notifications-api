import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';

describe('Count Recipient Notification', () => {
  it('should count notifications of a recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const countRecipientNotification = new CountRecipientNotification(
      notificationsRepository,
    );

    const recipient1Id = 'recipient1';
    const recipient2Id = 'recipient2';

    await notificationsRepository.create(
      makeNotification({ recipientId: recipient1Id }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: recipient1Id }),
    );
    await notificationsRepository.create(
      makeNotification({ recipientId: recipient2Id }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientId: recipient1Id,
    });

    expect(count).toBe(2);
  });
});
