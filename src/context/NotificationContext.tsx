
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
  isNew?: boolean;
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
    // Evitar duplicados
    setNotifications(prev => {
      const exists = prev.some(p => p.id === product.id);
      if (exists) return prev;
      
      const newNotifications = [product, ...prev];
      setHasNewNotifications(true);
      return newNotifications;
    });
  };

  const markAsRead = () => {
    setHasNewNotifications(false);
  };

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
