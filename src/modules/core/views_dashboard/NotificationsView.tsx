import React, { useState } from 'react';
import { Bell, DollarSign, CreditCard } from 'lucide-react';
import { ENotificationsViewStyles } from '../styles/styleIndex';

type NotificationType = {
  id: number;
  type: ENotificationType;
  message: string;
  time: string;
};

type ENotificationType = 'alert' | 'transaction' | 'card';

function NotificationsView() {
  const [notifications] = useState<NotificationType[]>([
    {
      id: 1,
      type: 'alert',
      message: 'Low balance in your checking account',
      time: '2 hours ago',
    },
    {
      id: 2,
      type: 'transaction',
      message: 'You received $500 from John Doe',
      time: '1 day ago',
    },
    {
      id: 3,
      type: 'card',
      message: 'Your new credit card has been shipped',
      time: '3 days ago',
    },
  ]);

  const getIcon = (type: ENotificationType) => {
    switch (type) {
      case 'alert':
        return <Bell className="text-yellow-500" />;
      case 'transaction':
        return <DollarSign className="text-green-500" />;
      case 'card':
        return <CreditCard className="text-blue-500" />;
      default:
        return <Bell className="text-gray-500" />;
    }
  };

  return (
    <div className={ENotificationsViewStyles.CONTAINER}>
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={ENotificationsViewStyles.NOTIFICATION}
        >
          <div className={ENotificationsViewStyles.ICON_CONTAINER}>
            {getIcon(notification.type)}
          </div>
          <div className="flex-1 min-w-0">
            <p className={ENotificationsViewStyles.MESSAGE}>
              {notification.message}
            </p>
            <p className={ENotificationsViewStyles.TIME}>
              {notification.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default NotificationsView;
