import { useEffect, useState } from 'react';

const Notification = ({ message }: { message: string }) => {
  return (
    <div className="notification">
      <p>{message}</p>
    </div>
  );
};

export default Notification;
