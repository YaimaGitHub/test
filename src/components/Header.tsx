
import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Bell, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useNotifications } from '../context/NotificationContext';
import { useLanguage } from '../context/LanguageContext';
import NotificationDropdown from './NotificationDropdown';

interface HeaderProps {
  onCartClick: () => void;
  onSearch: (term: string) => void;
}

const Header = ({ onCartClick, onSearch }: HeaderProps) => {
  const { cartItems } = useCart();
  const { notifications, hasNewNotifications, markAsRead } = useNotifications();
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    // Búsqueda en tiempo real
    onSearch(value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleNotificationClick = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications && hasNewNotifications) {
      markAsRead();
    }
  };

  const handleDemoLogin = () => {
    console.log('Demo user logged in');
    alert('Bienvenido! Has iniciado sesión como usuario demo.');
    setShowUserMenu(false);
  };

  const handleAdminLogin = () => {
    const password = prompt('Ingrese contraseña de administrador:');
    if (password === 'root') {
      console.log('Admin logged in');
      alert('Panel de administración próximamente...');
    } else {
      alert('Contraseña incorrecta');
    }
    setShowUserMenu(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      if (!target.closest('[data-dropdown="notifications"]')) {
        setShowNotifications(false);
      }
      if (!target.closest('[data-dropdown="user"]')) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* App Logo and Name */}
          <div className="flex items-center space-x-2 sm:space-x-3 min-w-0">
            <img
              className="h-6 w-6 sm:h-8 sm:w-8 rounded-lg flex-shrink-0"
              src="https://images.unsplash.com/photo-1518770660439-4636190af475?w=32&h=32&fit=crop"
              alt="PcComponentes Logo"
            />
            <h1 className="text-base sm:text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
              PcComponentes
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-xs sm:max-w-md mx-2 sm:mx-4">
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="search" className="sr-only">{t('search.placeholder')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-2 sm:pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="block w-full pl-8 sm:pl-10 pr-2 sm:pr-3 py-1.5 sm:py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
            {/* Cart button */}
            <button
              onClick={onCartClick}
              type="button"
              className="relative bg-white p-1 sm:p-1.5 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              <span className="sr-only">{t('cart')}</span>
              <ShoppingCart className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
              {cartItems.length > 0 && (
                <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-600 text-white text-xs font-medium flex items-center justify-center animate-pulse">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Notification button */}
            <div className="relative" data-dropdown="notifications">
              <button
                type="button"
                className="bg-white p-1 sm:p-1.5 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                onClick={handleNotificationClick}
              >
                <span className="sr-only">{t('notifications')}</span>
                <Bell className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                {hasNewNotifications && (
                  <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 h-4 w-4 sm:h-5 sm:w-5 rounded-full bg-red-600 text-white text-xs font-medium flex items-center justify-center animate-pulse">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <NotificationDropdown 
                  onClose={() => setShowNotifications(false)}
                  notifications={notifications}
                />
              )}
            </div>

            {/* User profile dropdown */}
            <div className="relative" data-dropdown="user">
              <button
                type="button"
                className="bg-white rounded-full p-1 sm:p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="sr-only">{t('user')}</span>
                <User className="h-5 w-5 sm:h-6 sm:w-6" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-scale-in">
                  <div className="py-1">
                    <button
                      onClick={handleDemoLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Cuenta Demo
                    </button>
                    <button
                      onClick={handleAdminLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors"
                    >
                      Admin Login
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
