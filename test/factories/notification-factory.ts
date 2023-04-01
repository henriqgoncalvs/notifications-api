import { Notification } from '@/application/entities/notification';
import { Content } from '@/application/entities/notification-content';

export function makeNotification(overrides?: Partial<Notification>) {
  return new Notification({
    category: 'test',
    content: new Content('Hello World!'),
    recipientId: '123',
    ...overrides,
  });
}
