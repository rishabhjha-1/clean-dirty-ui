
let notificationId = 0;

type Notification = {
  id: number;
  type: 'new_content' | 'status_update';
  message: string;
  timestamp: string;
};

const notificationTypes: { type: Notification['type']; message: string }[] = [
  { type: 'new_content', message: 'New content in your favorite category!' },
  { type: 'status_update', message: 'Your rating was updated by another user!' }
];

const notifications: Notification[] = [];

function generateNotification(): Notification {
  const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];

  return {
    id: notificationId++,
    ...randomNotification,
    timestamp: new Date().toISOString()
  };
}

export async function GET(): Promise<Response> {
  if (notifications.length < 5) {  
    notifications.push(generateNotification());
  }

  return new Response(JSON.stringify({ notifications }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
