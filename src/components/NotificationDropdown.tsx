
import React from 'react';
import { Clock, ShoppingCart, Bell, Eye } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';

interface NotificationProduct {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  brand?: string;
  timestamp: number;
  description?: string;
}

interface NotificationDropdownProps {
  notifications: NotificationProduct[];
  onClose: () => void;
}

const NotificationDropdown = ({ notifications, onClose }: NotificationDropdownProps) => {
  const { addToCart } = useCart();
  const { t } = useLanguage();

  const handleAddToCart = (product: NotificationProduct) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      originalPrice: product.originalPrice,
      image: product.image,
      inStock: true
    });
  };

  const handleViewDetails = (product: NotificationProduct) => {
    // Crear evento personalizado para mostrar detalles del producto
    const event = new CustomEvent('showProductDetails', { 
      detail: { 
        ...product,
        about: product.description || `${t('about.product')} ${product.name}`
      } 
    });
    window.dispatchEvent(event);
    onClose();
  };

  const formatTime = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    if (minutes < 1) return 'Ahora mismo';
    if (minutes < 60) return `Hace ${minutes} min`;
    const hours = Math.floor(minutes / 60);
    return `Hace ${hours} h`;
  };

  return (
    <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-lg shadow-xl border border-gray-100 z-50 animate-scale-in">
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{t('new.products')}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors text-xl"
          >
            ×
          </button>
        </div>
      </div>
      
      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="p-6 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>{t('no.new.products')}</p>
          </div>
        ) : (
          <div className="space-y-0">
            {notifications.map((product, index) => (
              <div 
                key={product.id}
                className="p-4 border-b border-gray-50 last:border-b-0 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all duration-300 animate-fade-in group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex space-x-3">
                  <img
                    src={`/images/products/${product.id}.jpg`}
                    alt={product.name}
                    className="w-16 h-16 object-cover rounded-lg shadow-md group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = product.image;
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-gray-800 line-clamp-2 mb-1 group-hover:text-blue-600 transition-colors">
                      {product.name}
                    </h4>
                    
                    {product.brand && (
                      <p className="text-xs text-blue-600 font-medium mb-1">
                        {product.brand}
                      </p>
                    )}
                    
                    <div className="flex items-center space-x-2 mb-2">
                      {product.originalPrice && (
                        <span className="text-xs text-gray-400 line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                      <span className="text-sm font-bold text-green-600">
                        ${product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-xs bg-red-100 text-red-600 px-1 py-0.5 rounded">
                          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(product.timestamp)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleViewDetails(product)}
                          className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center space-x-1"
                        >
                          <Eye className="w-3 h-3" />
                          <span>{t('view.details')}</span>
                        </button>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded-md text-xs font-medium transition-colors flex items-center space-x-1"
                        >
                          <ShoppingCart className="w-3 h-3" />
                          <span>{t('add.to.cart')}</span>
                        </button>
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
