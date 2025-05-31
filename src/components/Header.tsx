
import React, { useState } from 'react';
import { ShoppingCart, Menu, Search, Bell, User, Globe } from 'lucide-react';
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
  const { notifications, hasNewNotifications } = useNotifications();
  const { t, language, setLanguage } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Búsqueda en tiempo real
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleDemoLogin = () => {
    console.log('Demo user logged in');
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

  const handleLanguageChange = (lang: 'es' | 'en') => {
    setLanguage(lang);
    setShowLanguageMenu(false);
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button (hidden on larger screens) */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700"
              aria-label="Open sidebar"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>

          {/* App Logo and Name */}
          <div className="flex items-center space-x-3">
            <img
              className="h-8 w-auto"
              src="/images/logo.png"
              alt="PcComponentes Logo"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1518770660439-4636190af475?w=32&h=32&fit=crop";
              }}
            />
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              PcComponentes
            </h1>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-4">
            <form onSubmit={handleSearchSubmit}>
              <label htmlFor="search" className="sr-only">{t('search.placeholder')}</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
                </div>
                <input
                  type="search"
                  name="search"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder={t('search.placeholder')}
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
            </form>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Language selector */}
            <div className="relative">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              >
                <span className="sr-only">{t('language')}</span>
                <Globe className="h-6 w-6" aria-hidden="true" />
              </button>
              
              {showLanguageMenu && (
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={() => handleLanguageChange('es')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'es' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                    >
                      🇪🇸 {t('spanish')}
                    </button>
                    <button
                      onClick={() => handleLanguageChange('en')}
                      className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${language === 'en' ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-700'}`}
                    >
                      🇺🇸 {t('english')}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Cart button */}
            <button
              onClick={onCartClick}
              type="button"
              className="relative bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <span className="sr-only">{t('cart')}</span>
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs font-medium flex items-center justify-center">
                  {cartItems.length}
                </span>
              )}
            </button>

            {/* Notification button */}
            <div className="relative">
              <button
                type="button"
                className="bg-white p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowNotifications(!showNotifications)}
              >
                <span className="sr-only">{t('notifications')}</span>
                <Bell className="h-6 w-6" aria-hidden="true" />
                {hasNewNotifications && (
                  <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-red-600 text-white text-xs font-medium flex items-center justify-center animate-pulse">
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
            <div className="relative">
              <button
                type="button"
                className="bg-white rounded-full p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={() => setShowUserMenu(!showUserMenu)}
              >
                <span className="sr-only">{t('user')}</span>
                <User className="h-6 w-6" />
              </button>
              
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                  <div className="py-1">
                    <button
                      onClick={handleDemoLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Cuenta Demo
                    </button>
                    <button
                      onClick={handleAdminLogin}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
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
