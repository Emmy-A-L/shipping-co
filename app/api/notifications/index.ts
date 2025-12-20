import { db } from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";

// /pages/api/notifications/index.ts
export async function notificationsAPI(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.query;

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ error: 'User ID required' });
  }

  // GET - Get notifications
  if (req.method === 'GET') {
    const notifications = await db.getNotificationsByUser(userId);
    return res.status(200).json(notifications);
  }

  // PUT - Mark as read
  if (req.method === 'PUT') {
    const { notificationId } = req.body;
    await db.markNotificationAsRead(notificationId);
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
