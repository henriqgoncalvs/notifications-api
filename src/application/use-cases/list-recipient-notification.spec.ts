import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { ListRecipientNotifications } from './list-recipient-notifications';

describe('List Recipient Notification', () => {
  it('should list notifications of a recipient', async () => {
    const notificationsRepository = new InMemoryNotificationsRepository();

    const listRecipientNotifications = new ListRecipientNotifications(
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

    const { notifications } = await listRecipientNotifications.execute({
      recipientId: recipient1Id,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: recipient1Id }),
        expect.objectContaining({ recipientId: recipient1Id }),
      ]),
    );
  });
});
