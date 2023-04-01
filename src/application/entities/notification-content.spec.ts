import { Content } from './notification-content';

describe('Notification Content', () => {
  it('should be able to create a notification content', async () => {
    const content = new Content('Hello World');

    expect(content).toBeTruthy();
  });

  it('should not be able to create a notification content with less than 5 characters', async () => {
    expect(() => new Content('Hel')).toThrowError(
      'Content must be between 5 and 240 characters',
    );
  });

  it('should not be able to create a notification content with more than 240 characters', async () => {
    const stringWith241Characters = 'a'.repeat(241);

    expect(() => new Content(stringWith241Characters)).toThrowError(
      'Content must be between 5 and 240 characters',
    );
  });
});
