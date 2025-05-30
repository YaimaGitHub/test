
import React from 'react';
import HotSaleSection from './HotSaleSection';
import ProductGrid from './ProductGrid';
import BestSellers from './BestSellers';
import { useLanguage } from '../context/LanguageContext';

interface MainContentProps {
  onProductClick: (product: any) => void;
  selectedCategory: string;
  searchTerm: string;
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const MainContent = ({ onProductClick, selectedCategory, searchTerm, selectedFilter, onFilterChange }: MainContentProps) => {
  const { t } = useLanguage();

  const filters = [
    { key: 'All', label: 'Todos' },
    { key: 'Popular', label: t('popular') },
    { key: 'Cheap', label: t('cheap') },
    { key: 'Expensive', label: t('expensive') },
    { key: 'Sale', label: t('sale') }
  ];

  return (
    <main className="flex-1 p-2 sm:p-4 lg:p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-4 lg:gap-6">
          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <HotSaleSection />
            
            {/* Best Sellers Section - Mobile/Tablet: Above filters, Desktop: Sidebar */}
            <div className="xl:hidden mb-4 lg:mb-6">
              <BestSellers />
            </div>
            
            {/* Filters Section */}
            <div className="mb-4 lg:mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-3 sm:p-4">
              <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3">
                {t('filters')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => onFilterChange(filter.key)}
                    className={`px-3 sm:px-4 py-2 rounded-full font-medium text-xs sm:text-sm transition-all duration-300 transform hover:scale-105 ${
                      selectedFilter === filter.key
                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg'
                        : 'bg-gray-100 text-gray-700 hover:bg-gradient-to-r hover:from-green-50 hover:to-emerald-50 hover:text-green-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <ProductGrid 
              onProductClick={onProductClick}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              selectedFilter={selectedFilter}
            />
          </div>
          
          {/* Best Sellers Sidebar - Desktop only */}
          <div className="hidden xl:block xl:w-80 xl:flex-shrink-0">
            <BestSellers />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
