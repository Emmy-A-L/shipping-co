// /services/notificationService.ts
export class NotificationService {
  static async getNotifications(userId: string): Promise<Notification[]> {
    const response = await fetch(`/api/notifications?userId=${userId}`);
    return response.json();
  }

  static async markAsRead(userId: string, notificationId: string): Promise<void> {
    await fetch(`/api/notifications?userId=${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notificationId })
    });
  }
}