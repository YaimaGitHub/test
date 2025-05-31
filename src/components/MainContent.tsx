
import React from 'react';
import HotSaleSection from './HotSaleSection';
import ProductGrid from './ProductGrid';
import CubanMarketInfo from './CubanMarketInfo';
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
    { key: 'All', label: t('all') },
    { key: 'Popular', label: t('popular') },
    { key: 'Cheap', label: t('cheap') },
    { key: 'Expensive', label: t('expensive') },
    { key: 'Sale', label: t('sale') }
  ];

  return (
    <main className="flex-1 p-4 md:p-6 md:ml-0">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* Main Content */}
          <div className="flex-1">
            {/* Hot Sale Section */}
            <HotSaleSection />
            
            {/* Cuban Market Info - Moved here, below banner and above filters */}
            <div className="mb-6">
              <CubanMarketInfo />
            </div>

            {/* Filters Section */}
            <div className="mb-6 bg-white rounded-xl shadow-sm border border-gray-100 p-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                {t('filters')}
              </h3>
              <div className="flex flex-wrap gap-2">
                {filters.map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => onFilterChange(filter.key)}
                    className={`px-4 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
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

            {/* Product Grid */}
            <ProductGrid 
              onProductClick={onProductClick}
              selectedCategory={selectedCategory}
              searchTerm={searchTerm}
              selectedFilter={selectedFilter}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default MainContent;
