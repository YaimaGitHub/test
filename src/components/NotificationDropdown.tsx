
import React from 'react';
import { Clock, Eye, Bell } from 'lucide-react';

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

interface NotificationDropdownProps {
  notifications: NotificationProduct[];
  onClose: () => void;
}

const NotificationDropdown = ({ notifications, onClose }: NotificationDropdownProps) => {
  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `Hace ${hours} h`;
  };

  const handleViewProduct = (product: NotificationProduct) => {
    // Disparar evento para abrir modal del producto
    const event = new CustomEvent('viewNotificationProduct', { detail: product });
    window.dispatchEvent(event);
    onClose();
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-80 sm:w-96 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-scale-in max-h-[80vh] flex flex-col">
      <div className="p-3 sm:p-4 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center justify-between">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800">Productos Nuevos</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No hay productos nuevos</p>
          </div>
        ) : (
          <div className="space-y-0">
            {notifications.map((product, index) => (
              <div 
                key={product.id}
                className="p-3 sm:p-4 border-b border-gray-50 last:border-b-0 hover:bg-gray-50 transition-colors animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => handleViewProduct(product)}
              >
                <div className="flex space-x-3">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1">
                        {product.name}
                      </h4>
                      {product.isNew && (
                        <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs font-medium flex-shrink-0">
                          NUEVO
                        </span>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mb-2">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-bold text-green-600">
                        ${product.price}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(product.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-1 text-xs text-blue-600 hover:text-blue-800 transition-colors">
                        <Eye className="w-3 h-3" />
                        <span>Ver detalles</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NotificationDropdown;
