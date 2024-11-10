import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Notification from './Notification';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState<string[]>([]);
  const socket = io('url'); 

  useEffect(() => {
    socket.on('new_notification', (message) => {
      setNotifications((prev) => [message, ...prev]);
    });

    return () => {
      socket.off('new_notification');
    };
  }, []);

  return (
    <div>
      {notifications.map((notification, index) => (
        <Notification key={index} message={notification} />
      ))}
    </div>
  );
};

export default NotificationSystem;
