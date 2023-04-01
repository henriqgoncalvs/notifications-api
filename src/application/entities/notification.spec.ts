import { Notification } from './notification';
import { Content } from './notification-content';

const notificationMock = {
  recipientId: '123',
  content: new Content('Hello World'),
  category: 'category',
};

describe('Notification', () => {
  it('should be able to create a notification', async () => {
    const notification = new Notification(notificationMock);

    expect(notification).toBeTruthy();
  });
});
