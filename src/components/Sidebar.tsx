
import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface SidebarProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const Sidebar = ({ selectedCategory, onCategoryChange }: SidebarProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const categories = [
    { key: 'All', label: t('all') },
    { key: 'Mobile', label: t('mobile') },
    { key: 'Laptop', label: t('laptop') },
    { key: 'Gaming', label: t('gaming') },
    { key: 'Audio', label: t('audio') },
    { key: 'Accessories', label: t('accessories') },
    { key: 'TV', label: t('tv') },
    { key: 'Appliances', label: t('appliances') }
  ];

  // Auto-hide sidebar on mobile/tablet when not in use
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('mobile-sidebar');
      const trigger = document.getElementById('sidebar-trigger');
      
      if (isOpen && sidebar && !sidebar.contains(event.target as Node) && 
          trigger && !trigger.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="sidebar-trigger"
        onClick={toggleSidebar}
        className="lg:hidden fixed top-20 left-2 sm:left-4 z-30 bg-white shadow-lg rounded-xl p-2 sm:p-3 border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <Menu className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div 
        id="mobile-sidebar"
        className={`
          fixed lg:sticky top-0 left-0 h-screen bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out
          lg:transform-none lg:shadow-lg lg:z-0
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          ${isCollapsed ? 'lg:w-16' : 'w-72 sm:w-80 lg:w-64'}
        `}
      >
        {/* Desktop Collapse Button */}
        <button
          onClick={toggleCollapse}
          className="hidden lg:block absolute top-4 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-200 z-10"
        >
          <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between p-3 sm:p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className={`text-lg font-bold text-gray-800 ${isCollapsed ? 'hidden' : ''}`}>
            Categorías
          </h2>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-white/80 rounded-xl transition-colors"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
          </button>
        </div>

        <div className={`p-3 sm:p-4 lg:p-6 h-full overflow-y-auto ${isCollapsed ? 'lg:p-2' : ''}`}>
          {/* Categories */}
          <div className="mb-8">
            {!isCollapsed && (
              <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                {t('categories')}
              </h3>
            )}
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => {
                    onCategoryChange(category.key);
                    setIsOpen(false);
                  }}
                  className={`w-full text-left ${isCollapsed ? 'lg:px-2 lg:py-3 lg:justify-center' : 'px-3 sm:px-4 py-2 sm:py-3'} rounded-xl font-medium text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.02] flex items-center ${
                    selectedCategory === category.key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
                  title={isCollapsed ? category.label : undefined}
                >
                  {isCollapsed ? (
                    <span className="text-xs font-bold">{category.label.slice(0, 2).toUpperCase()}</span>
                  ) : (
                    category.label
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
