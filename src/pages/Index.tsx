
import React, { useState, useEffect } from 'react';
import { Toaster } from 'sonner';
import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import MainContent from '../components/MainContent';
import ProductModal from '../components/ProductModal';
import CartPage from '../components/CartPage';
import { CartProvider } from '../context/CartContext';
import { NotificationProvider } from '../context/NotificationContext';
import { LanguageProvider } from '../context/LanguageContext';

const Index = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // Listen for clear category event
  useEffect(() => {
    const handleClearCategory = () => {
      setSelectedCategory('All');
    };

    const handleViewNotificationProduct = (event) => {
      setSelectedProduct(event.detail);
    };

    window.addEventListener('clearCategory', handleClearCategory);
    window.addEventListener('viewNotificationProduct', handleViewNotificationProduct);
    
    return () => {
      window.removeEventListener('clearCategory', handleClearCategory);
      window.removeEventListener('viewNotificationProduct', handleViewNotificationProduct);
    };
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
  };

  const handleCartClick = () => {
    setCurrentPage('cart');
  };

  const handleContinueShopping = () => {
    setCurrentPage('home');
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage('home');
  };

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
    setCurrentPage('home');
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage('home');
    // Si se está buscando, resetear categoría para mostrar todos los productos
    if (term && selectedCategory !== 'All') {
      setSelectedCategory('All');
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <NotificationProvider>
          <div className="min-h-screen bg-gray-50">
            <Header 
              onCartClick={handleCartClick} 
              onSearch={handleSearch}
            />
            <div className="flex min-h-[calc(100vh-3.5rem)] sm:min-h-[calc(100vh-4rem)]">
              <Sidebar 
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
              />
              <div className="flex-1 min-w-0">
                {currentPage === 'home' ? (
                  <MainContent 
                    onProductClick={handleProductClick}
                    selectedCategory={selectedCategory}
                    searchTerm={searchTerm}
                    selectedFilter={selectedFilter}
                    onFilterChange={handleFilterChange}
                  />
                ) : (
                  <CartPage onContinueShopping={handleContinueShopping} />
                )}
              </div>
            </div>
            {selectedProduct && (
              <ProductModal 
                product={selectedProduct} 
                onClose={handleCloseModal}
              />
            )}
            <Toaster 
              position="top-right"
              theme="light"
              richColors
              closeButton
              toastOptions={{
                style: {
                  background: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '12px',
                  boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                }
              }}
            />
          </div>
        </NotificationProvider>
      </CartProvider>
    </LanguageProvider>
  );
};

export default Index;
