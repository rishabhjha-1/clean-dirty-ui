
'use client';

import { useEffect, useState } from 'react';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      const data = await response.json();
      setNotifications(data.notifications);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000); // Poll every 5 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="notification-system">
      <h2 className="text-lg font-semibold mb-4">Notifications</h2>
      <ul>
        {notifications.map((notification:{id:string,type:string,message:string,timestamp:string}) => (
          <li key={notification.id} className="mb-2 p-2 border rounded-md">
            <strong>{notification.type === 'new_content' ? 'New Content' : 'Status Update'}:</strong>{' '}
            {notification.message} <br />
            <small>{new Date(notification.timestamp).toLocaleString()}</small>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationSystem;
