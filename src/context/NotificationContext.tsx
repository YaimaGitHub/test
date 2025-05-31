
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface NotificationProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand?: string;
  timestamp: number;
}

interface NotificationContextType {
  notifications: NotificationProduct[];
  hasNewNotifications: boolean;
  addNotification: (product: NotificationProduct) => void;
  markAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<NotificationProduct[]>([]);
  const [hasNewNotifications, setHasNewNotifications] = useState(false);

  const addNotification = (product: NotificationProduct) => {
    setNotifications(prev => [product, ...prev]);
    setHasNewNotifications(true);
  };

  const markAsRead = () => {
    setHasNewNotifications(false);
  };

  // Simulate adding new products periodically for demo
  useEffect(() => {
    const demoProducts = [
      {
        id: 'new-gaming-mouse',
        name: 'Razer DeathAdder V3 Gaming Mouse',
        price: 69,
        originalPrice: 99,
        image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=200&fit=crop',
        category: 'Gaming',
        brand: 'RAZER',
        timestamp: Date.now()
      },
      {
        id: 'new-wireless-headset',
        name: 'SteelSeries Arctis 7P Wireless Headset',
        price: 149,
        originalPrice: 199,
        image: 'https://images.unsplash.com/photo-1599669454699-248893623440?w=300&h=200&fit=crop',
        category: 'Audio',
        brand: 'STEELSERIES',
        timestamp: Date.now() + 1000
      }
    ];

    const timer = setTimeout(() => {
      addNotification(demoProducts[0]);
    }, 5000);

    const timer2 = setTimeout(() => {
      addNotification(demoProducts[1]);
    }, 10000);

    return () => {
      clearTimeout(timer);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <NotificationContext.Provider value={{
      notifications,
      hasNewNotifications,
      addNotification,
      markAsRead
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};
