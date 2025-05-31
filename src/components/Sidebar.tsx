
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
    { key: 'All', label: t('all'), emoji: '🏠' },
    { key: 'Mobile', label: t('mobile'), emoji: '📱' },
    { key: 'Laptop', label: t('laptop'), emoji: '💻' },
    { key: 'Gaming', label: t('gaming'), emoji: '🎮' },
    { key: 'Audio', label: t('audio'), emoji: '🎧' },
    { key: 'Accessories', label: t('accessories'), emoji: '⚡' },
    { key: 'TV', label: t('tv'), emoji: '📺' },
    { key: 'Appliances', label: t('appliances'), emoji: '🏠' }
  ];

  // Auto-hide sidebar on mobile after category selection
  useEffect(() => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  }, [selectedCategory]);

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleCollapse = () => setIsCollapsed(!isCollapsed);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={toggleSidebar}
        className="md:hidden fixed top-20 left-4 z-30 bg-white shadow-lg rounded-xl p-3 border border-gray-200 hover:shadow-xl transition-all duration-300"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed md:sticky top-0 left-0 h-screen bg-white shadow-xl z-50 transform transition-all duration-300 ease-in-out
        md:transform-none md:shadow-lg md:z-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        ${isCollapsed ? 'md:w-16' : 'md:w-64'}
        w-72
      `}>
        {/* Desktop Collapse Button */}
        <button
          onClick={toggleCollapse}
          className="hidden md:block absolute -right-3 top-6 bg-white border border-gray-200 rounded-full p-1 shadow-md hover:shadow-lg transition-all duration-300 z-10"
        >
          <ChevronLeft className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
        </button>

        {/* Mobile Header */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <h2 className="text-lg font-bold text-gray-800">{t('categories')}</h2>
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-white/80 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <div className="p-6 h-full overflow-y-auto">
          {/* Categories */}
          <div className="mb-8">
            {!isCollapsed && (
              <h3 className="text-lg font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hidden md:block">
                {t('categories')}
              </h3>
            )}
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category.key}
                  onClick={() => {
                    onCategoryChange(category.key);
                    if (window.innerWidth < 768) {
                      setIsOpen(false);
                    }
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 transform hover:scale-[1.02] flex items-center space-x-3 group ${
                    selectedCategory === category.key
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 hover:text-blue-600'
                  }`}
                  title={isCollapsed ? category.label : ''}
                >
                  <span className="text-xl">{category.emoji}</span>
                  {!isCollapsed && (
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                      {category.label}
                    </span>
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
