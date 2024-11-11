// app/api/notifications/route.js

let notificationId = 0;

// Mock function to generate a notification
function generateNotification() {
  const notifications = [
    { type: 'new_content', message: 'New content in your favorite category!' },
    { type: 'status_update', message: 'Your rating was updated by another user!' }
  ];

  return {
    id: notificationId++,
    ...notifications[Math.floor(Math.random() * notifications.length)],
    timestamp: new Date().toISOString()
  };
}

// Store notifications in an array (simulating a database)
const notifications = <any>[];

export async function GET(request:any) {
  // Add a new notification each time this endpoint is called, for demonstration
  if (notifications.length < 5) {  // Limit to 5 notifications for simplicity
    notifications.push(generateNotification());
  }

  return new Response(JSON.stringify({ notifications }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
